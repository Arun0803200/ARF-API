const { userRoutes } = require('../Routes/EventRoutes');
const {EventLogService} = require('../Core/Services/EventLogService');
const {logLevel, eventTypes} = require('../Utils/Settings');

const eventLogService = new EventLogService();
const events = {
    ...userRoutes,
};

function extractPayload(req) {
    let payload = {};
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        payload = req.body;
    } else if (['GET', 'HEAD'].includes(req.method)) {
        payload = req.query;
    }
    if (req.params && Object.keys(req.params).length > 0) {
        payload = { ...payload, params: req.params };
    }
    return payload;
}

const eventLogMiddleware = (req, res, next) => {    
    const oldResJson = res.json;
    const startTime = Date.now();
    const parsedUrl = req._parsedUrl?.pathname.split('/') || [];
    const splitedData = parsedUrl.pop();
    const eventEndPoint = `/${req.method.toLowerCase()}${parsedUrl.join('/')}${splitedData ? (isNaN(splitedData) && splitedData.length !== 24 ? '/' + splitedData : '/') : ''}`;
    const eventData = events[eventEndPoint] || {};

    process.nextTick(async () => {
        await eventLogService.create({
            level: logLevel.info,
            apiEndpoint: req.originalUrl,
            apiMethod: req.method,
            statusCode: null,
            apiPayload: extractPayload(req),
            userId: req.user?.id || null,
            ipAddress: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.headers['cf-connecting-ip'] || req.ip,
            userAgent: req.headers['user-agent'],
            environment: process.env.ENVIRONMENT || 'development',
            host: req.hostname,
            eventType: eventTypes.request,
            deviceId: req.headers['x-device-id'] || null,
            platform: req.headers['x-platform'] || null,
            sessionId: req.headers['x-session-id'] || null,
            appVersion: req.headers['x-app-version'] || null,
            eventEndPoint: eventEndPoint || null,
            eventName: eventData?.name || 'Untracked Event',
            eventSlug: eventData?.slug || 'untracked-event',
            responseTimeMs: null,
            errorMessage: null,
            errorStack: null,
            errorType: null,
            responseBody: null,
        });
    });

    // Wrap res.json to log response details
    res.json = function (body) {
        const responseTimeMs = Date.now() - startTime;
        const statusCode = res.statusCode;
        const level = statusCode >= 500 ? logLevel.error : statusCode >= 400 ? logLevel.warn : logLevel.info;
        if (statusCode < 500) {
            process.nextTick(async () => {
                await eventLogService.create({
                    level,
                    apiEndpoint: req.originalUrl,
                    apiMethod: req.method,
                    statusCode,
                    apiPayload: extractPayload(req),
                    errorMessage: typeof body === 'string' ? body : body?.message || body?.msg || null,
                    errorStack: body?.stack || null,
                    errorType: statusCode >= 500 ? 'ServerError' : statusCode >= 400 ? 'ClientError' : null,
                    userId: req.user?.id || null,
                    ipAddress: req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.headers['cf-connecting-ip'] || req.ip,
                    userAgent: req.headers['user-agent'],
                    environment: process.env.ENVIRONMENT || 'development',
                    host: req.hostname,
                    responseTimeMs,
                    deviceId: req.headers['x-device-id'] || null,
                    platform: req.headers['x-platform'] || null,
                    sessionId: req.headers['x-session-id'] || null,
                    appVersion: req.headers['x-app-version'] || null,
                    responseBody: body,
                    eventType: eventTypes.response,
                    eventEndPoint: eventEndPoint || null,
                    eventName: eventData?.name || 'Untracked Event',
                    eventSlug: eventData?.slug || 'untracked-event',
                });
            });
        }

        res.json = oldResJson;

        try {
            return oldResJson.call(this, body);
        } catch (err) {
            console.error('Error in res.json:', err);
            throw err;
        }
    };

    next();
};

// Error handler to catch thrown errors
const errorHandler = async (err, req, res, next) => {
  try {
    const parsedUrl = req._parsedUrl?.pathname.split("/") || [];
    const splitedData = parsedUrl.pop();

    const eventEndPoint = `/${req.method.toLowerCase()}${parsedUrl.join("/")}${
      splitedData
        ? isNaN(splitedData) && splitedData.length !== 24
          ? "/" + splitedData
          : "/"
        : ""
    }`;

    const eventData = events[eventEndPoint] || {};

    await eventLogService.create({
      level: logLevel.error,
      apiEndpoint: req.originalUrl,
      apiMethod: req.method,
      statusCode: err.status || 500,
      apiPayload: extractPayload(req),
      errorMessage: err.message || "Unhandled error",
      errorStack: err.stack || null,
      errorType: err.name || "ServerError",
      userId: req.user?.id || null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
      environment: process.env.ENVIRONMENT || "development",
      host: req.hostname,
      deviceId: req.headers["x-device-id"] || null,
      platform: req.headers["x-platform"] || null,
      sessionId: req.headers["x-session-id"] || null,
      appVersion: req.headers["x-app-version"] || null,
      eventEndPoint: eventEndPoint || null,
      eventName: eventData?.name || "Untracked Event",
      eventSlug: eventData?.slug || "untracked-event",
      responseTimeMs: null,
      responseBody: null,
      eventType: eventTypes.response,
    });

    console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${err.message}`);
  } catch (logErr) {
    console.error("Failed to save error log:", logErr.message);
  }

  return res.status(err.status || 500).json({
    sts: 1,
    msg: err.message || "Internal Server Error",
  });
};

module.exports = { eventLogMiddleware, errorHandler };
