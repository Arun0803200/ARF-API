/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'tbl_token';

exports.up = function (knex) {
    return knex.schema.createTable(tableName, (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable().index();
        table.string('refresh_token').notNullable();
        table.string('access_token').notNullable();
        table.string('device_id').notNullable().index();
        table.json('device_info').notNullable();
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    knex.schema.dropTable(tableName);
};
