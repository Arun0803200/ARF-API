/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'tbl_activity_logs';
const {activityLogActions} = require('../Utils/Settings');
exports.up = function(knex) {
    return knex.schema.createTable(tableName, function(table) {
        table.bigIncrements('id').primary();
        table.bigInteger('user_id').nullable().index();
        table.string('tbl_name', 100).notNullable().index();
        table.bigInteger('ref_id').nullable().index();
        table.enu('action', Object.values(activityLogActions)).notNullable().index();
        table.json('request_data').nullable();
        table.json('response_data').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).index();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists(tableName);
};
