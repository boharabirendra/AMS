import { Knex } from "knex";

const TABLE_NAME = "user";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  await knex.raw(`CREATE TYPE gender_enum AS ENUM ('M', 'F', 'O');`);
  await knex.raw(
    `CREATE TYPE role_enum AS ENUM ('ADMIN', 'MANAGER', 'ARTIST');`
  );
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("id").primary().unsigned();
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("email", 255).unique().notNullable();
    table.string("password", 500).notNullable();
    table.string("phone", 20).notNullable();
    table.string("address", 255).notNullable();
    table.timestamp("dob").notNullable();
    table.specificType("gender", "gender_enum").notNullable().defaultTo("M");
    table.specificType("role", "role_enum").notNullable().defaultTo("ARTIST");
    table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));
    table.timestamp("updated_at");
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
