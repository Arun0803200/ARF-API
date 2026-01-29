const { User } = require('../Models/UserModel');

class UserRepository {
  constructor(knex) {
    this.knex = knex;
    this.table = 'tbl_user';
  }

  /**
   * Create new user
   */
  async create(data) {
    const [id] = await this.knex(this.table).insert(data);
    return this.findById(id);
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    const row = await this.knex(this.table).where({ id }).first();
    return row ? new User(row) : null;
  }

  /**
   * Find user by mobile number (for search)
   */
  async findByMobile(mobileNumberForSearch) {
    const row = await this.knex(this.table)
      .where({ mobileNumberForSearch })
      .first();
    return row ? new User(row) : null;
  }

  /**
   * Find by any condition
   */
  async findOne(where) {
    const row = await this.knex(this.table).where(where).first();
    return row ? new User(row) : null;
  }

  /**
   * Return all users
   */
  async findAll() {
    const rows = await this.knex(this.table);
    return rows.map((r) => new User(r));
  }

  /**
   * Update user fields
   */
  async update(id, updates) {
    await this.knex(this.table).where({ id }).update(updates);
    return this.findById(id);
  }

  /**
   * Delete user
   */
  async delete(id) {
    return this.knex(this.table).where({ id }).del();
  }
}

module.exports = { UserRepository };
