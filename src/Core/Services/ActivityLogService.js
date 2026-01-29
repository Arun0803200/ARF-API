const connectDB = require('../../Config/Database');
const {ActivityLogRepository} = require('../Repositories/ActivityLogRepository');
// Initialize DB only once
const db = connectDB();

// Pass DB instance to repository
const activityLogRepo = new ActivityLogRepository(db);

class ActivityLogService {
  async create(data) {
    return await activityLogRepo.create(data);
  }

  async getActivityLog(id) {
    return await activityLogRepo.findById(id);
  }
}

module.exports = { ActivityLogService };
