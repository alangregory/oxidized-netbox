import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('devices', table => {
        table.string('name');
        table.string('model');
        table.string('ip');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('devices');
}

