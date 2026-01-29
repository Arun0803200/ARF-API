/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'tbl_event_logs';
const {logLevel, eventTypes} = require('../Utils/Settings');
exports.up = function(knex) {
  return knex.schema.createTable(tableName, function(table) {
    table.bigIncrements('id').primary();
    table.enu('level', Object.values(logLevel)).defaultTo(logLevel.info).index();
    table.string('api_endpoint', 255).index();
    table.string('api_method', 10);
    table.integer('status_code').index();
    table.json('api_payload');
    table.text('error_message');
    table.text('error_stack');
    table.string('error_type', 100);
    table.integer('response_time_ms');
    table.bigInteger('user_id').index();
    table.string('ip_address', 64).index();
    table.string('user_agent', 512);
    table.string('environment', 32).index();
    table.string('host', 128);
    table.string('device_id', 128).index();
    table.string('session_id', 128).index();
    table.string('app_version', 32);
    table.enu('event_type', Object.values(eventTypes)).index();
    table.json('response_body');
    table.string('event_end_point', 255).index();
    table.string('event_name', 128).index();
    table.string('event_slug', 128).index();
    table.string('platform', 32).index();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now()).index();
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.comment('Event logs table');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(tableName);
};
