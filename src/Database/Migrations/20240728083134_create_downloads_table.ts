import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    return knex.schema.createTable('downloads', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('user_id').notNullable().references('id').inTable('users');
        table.text('title').notNullable();
        table.string('format').notNullable();
        table.bigInteger('size').notNullable();
        table.text('url').notNullable();
        table.string('thumbnail_url').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('downloads');
}
