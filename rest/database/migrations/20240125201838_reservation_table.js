const tableName = 'reservation';

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.integer('train_id').unsigned().notNullable();
        table.foreign('train_id').references('id').inTable('train');
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('user');
        table.integer('carriage_class_id').unsigned().notNullable();
        table.foreign('carriage_class_id').references('id').inTable('carriage_class');
        table.integer('seat_number').unsigned().notNullable();
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
