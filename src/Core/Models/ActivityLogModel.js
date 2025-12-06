class ActivityLog {
  constructor({
    id = null,
    userId = null,
    tblName = null,
    refId = null,
    action = null,
    requestData = null,
    responseData = null,
    createdAt = null,
  }) {
    this.id = id;
    this.userId = userId;
    this.tblName = tblName;
    this.refId = refId;
    this.action = action;
    this.requestData = requestData;
    this.responseData = responseData;
    this.createdAt = createdAt;
  }
}

module.exports = { ActivityLog };
