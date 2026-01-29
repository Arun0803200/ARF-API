class EventLog {
  constructor({
    id = null,
    level = 'info',
    apiEndpoint = null,
    apiMethod = null,
    statusCode = null,
    apiPayload = null,
    errorMessage = null,
    errorStack = null,
    errorType = null,
    responseTimeMs = null,
    userId = null,
    ipAddress = null,
    userAgent = null,
    environment = null,
    host = null,
    deviceId = null,
    sessionId = null,
    appVersion = null,
    eventType = null,
    responseBody = null,
    eventEndPoint = null,
    eventName = null,
    eventSlug = null,
    platform = null,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.level = level;
    this.apiEndpoint = apiEndpoint;
    this.apiMethod = apiMethod;
    this.statusCode = statusCode;
    this.apiPayload = apiPayload;
    this.errorMessage = errorMessage;
    this.errorStack = errorStack;
    this.errorType = errorType;
    this.responseTimeMs = responseTimeMs;
    this.userId = userId;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.environment = environment;
    this.host = host;
    this.deviceId = deviceId;
    this.sessionId = sessionId;
    this.appVersion = appVersion;
    this.eventType = eventType;
    this.responseBody = responseBody;
    this.eventEndPoint = eventEndPoint;
    this.eventName = eventName;
    this.eventSlug = eventSlug;
    this.platform = platform;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = { EventLog };
