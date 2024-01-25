const tableName = 'train';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    await knex.schema.createTable(tableName, function (table) {
        table.increments('id').primary();
        table.string('train_name').notNullable();
        table.string('departure_station').notNullable();
        table.string('arrival_station').notNullable();
        table.dateTime('departure_time', { precision: 6 });
        table.dateTime('arrival_time', { precision: 6 });
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
