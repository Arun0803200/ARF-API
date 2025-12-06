/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'tbl_user';
const { userRoles } = require('../Utils/Settings');

exports.up = function (knex) {
  return knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary();

    // Mobile Number
    table.json('mobile_number').notNullable();
    table.string('mobile_number_for_search').notNullable().index();

    // Full Name
    table.json('full_name').notNullable();
    table.string('full_name_for_search').notNullable().index();

    // Basic fields
    table.json('address').notNullable();
    table.json('dob').notNullable();
    table.enum('gender', ['male', 'female', 'others']).notNullable();

    // Aadhar
    table.json('aadhar_number').notNullable();
    table.string('aadhar_number_for_search').notNullable().index();

    // PAN
    table.json('pan_number').notNullable();
    table.string('pan_number_for_search').notNullable().index();

    // Role
    table.enum('role', Object.values(userRoles)).notNullable().defaultTo(userRoles.USER);

    // Timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
