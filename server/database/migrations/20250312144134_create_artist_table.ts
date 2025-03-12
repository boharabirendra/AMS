import { Knex } from 'knex';

const TABLE_NAME = 'artist';

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements('id').primary().unsigned();
    table.string('name', 255).notNullable();
    table.string('address', 255).notNullable();
    table.timestamp('dob').notNullable();
    table.string('first_release_year', 4).notNullable();
    table.bigInteger('no_of_albums_released').notNullable().defaultTo(0);
    table.specificType('gender', 'gender_enum').notNullable().defaultTo('M');
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
