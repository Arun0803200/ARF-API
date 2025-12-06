class ActivityLogRepository {
  constructor(knex) {
    this.knex = knex;
    this.table = 'tbl_activity_logs';
  }

  /**
   * Create new activity log
   */
  async create(data) {
    const [id] = await this.knex(this.table).insert(data);
    return this.findById(id);
  }
}

module.exports = { ActivityLogRepository };
