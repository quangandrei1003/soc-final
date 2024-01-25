const tableName = 'carriage_class';

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.string('class_name', 1).notNullable();
        table.string('class_description').notNullable();
        table.integer('seating_capacity').unsigned().notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    await knex.schema.dropTable(tableName);

};
