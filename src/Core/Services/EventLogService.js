const connectDB = require('../../Config/Database');
const {EventLogRepository} = require('../Repositories/EventLogRepository');
// Initialize DB only once
const db = connectDB();

// Pass DB instance to repository
const eventLogRepo = new EventLogRepository(db);

class EventLogService {
  async create(data) {
    return await eventLogRepo.create(data);
  }

  async getEventLog(id) {
    return await eventLogRepo.findById(id);
  }
}

module.exports = { EventLogService };
