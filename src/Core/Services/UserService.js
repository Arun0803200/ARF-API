const connectDB = require('../../Config/Database');
const { UserRepository } = require('../Repositories/UserRepository');

// Initialize DB only once
const db = connectDB();

// Pass DB instance to repository
const userRepo = new UserRepository(db);

class UserService {
  async registerUser(data) {
    return await userRepo.create(data);
  }

  async getUser(id) {
    return await userRepo.findById(id);
  }

  async findOne(data) {
    return await userRepo.findOne(data);
  }
}

module.exports = { UserService };
