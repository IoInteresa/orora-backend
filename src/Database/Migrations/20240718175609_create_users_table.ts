import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('users', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('username', 50).notNullable().unique();
        table.string('email', 100);
        table.string('password', 255).notNullable();
        table.string('phonenumber', 100);
        table.boolean('verified').notNullable().defaultTo(false);
        table.boolean('active').notNullable().defaultTo(true);
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}
