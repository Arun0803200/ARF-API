/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const tableName = 'tbl_user';
const { userRoles, gender } = require('../Utils/Settings');

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
    table.json('address').nullable();
    table.json('dob').notNullable();
    table.enum('gender', Object.values(gender)).nullable();

    // Aadhar
    table.json('aadhar_number').nullable();
    table.string('aadhar_number_for_search').nullable().index();

    // PAN
    table.json('pan_number').nullable();
    table.string('pan_number_for_search').nullable().index();

    // Role
    table.enum('role', Object.values(userRoles)).notNullable().defaultTo(userRoles.USER);

    // Profile Image
    table.string('profile_image_url').nullable();
    table.string('profile_image_original_name').nullable();
    table.string('profile_image_mime_type').nullable();
    table.bigInteger('profile_image_size').nullable();

    // Timestamps
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(tableName);
};
