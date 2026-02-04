class Token {
  constructor({
    id = null,
    userId = userId,
    refreshToken = null,
    accessToken = null,
    deviceId = null,
    deviceInfo = null,
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.accessToken = accessToken;
    this.deviceId = deviceId;
    this.deviceInfo = deviceInfo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = { Token };