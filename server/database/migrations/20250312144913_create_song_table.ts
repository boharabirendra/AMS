import { Knex } from 'knex';

const TABLE_NAME = 'song';

const RELATED_TABLES = {
  ARTIST: 'artist',
};

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    `CREATE TYPE genre_enum AS ENUM ('rnb', 'country', 'classic', 'rock', 'jaaz');`,
  );
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table
      .bigInteger('artist_id')
      .unsigned()
      .references('id')
      .inTable(RELATED_TABLES.ARTIST);
    table.string('title', 255).notNullable();
    table.string('album_name', 255).notNullable();
    table
      .specificType('genre', 'genre_enum')
      .notNullable()
      .defaultTo('country');
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at');
  });
}

/**
 * Drop TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
