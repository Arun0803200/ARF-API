const userRoles = {
    user: 'user',
    vendor: 'vendor',
};

const activityLogActions = {
    created: 'created',
    updated: 'updated',
    deleted: 'deleted',
};

const logLevel = {
    info: 'info',
    warn: 'warn',
    error: 'error',
};

const eventTypes = {
    request: 'request',
    response: 'response',
    custom: 'custom',
};

const gender = {
    male: 'male',
    female: 'female',
    others: 'others',
};

module.exports = { userRoles, activityLogActions, logLevel, eventTypes, gender };
