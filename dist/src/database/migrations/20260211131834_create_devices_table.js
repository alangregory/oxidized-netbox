"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable('devices', table => {
        table.string('name');
        table.string('model');
        table.string('ip');
    });
}
async function down(knex) {
    return knex.schema.dropTable('devices');
}
