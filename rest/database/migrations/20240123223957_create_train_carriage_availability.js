const tableName = 'train_carriage_availability';

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.integer('train_id').unsigned().notNullable();
        table.foreign('train_id').references('id').inTable('train');
        table.integer('carriage_class_id').unsigned().notNullable();
        table.foreign('carriage_class_id').references('id').inTable('carriage_class');
        table.integer('available_seat').unsigned().notNullable();
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
