class EventLogRepository {
    constructor(knex) {
        this.knex = knex;
        this.table = 'tbl_event_logs';
    }

    /**
     * Create new event log
     */
    async create(data) {
        const [id] = await this.knex(this.table).insert(data);
        return this.findById(id);
    }

    async findById(id) {
        const record = await this.knex(this.table).where({ id }).first();
        return record || null;
    }
}

module.exports = { EventLogRepository };
