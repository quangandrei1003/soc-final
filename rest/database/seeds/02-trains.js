/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
import { faker, fakerFR } from '@faker-js/faker';
const tableName = 'train';

const trainsArr = [{
  trainName: faker.string.alpha({ length: 4, casing: 'upper' }),
  departureStation: `Paris`,
  arrivalStation: `London`,
  departureTime: faker.date.soon({ refDate: Date.now() }),
  arrivalTime: faker.date.between({ from: Date.now(), to: '2024-01-26T00:00:00.000Z' })
},
{
  trainName: faker.string.alpha({ length: 4, casing: 'upper' }),
  departureStation: `Paris`,
  arrivalStation: `London`,
  departureTime: faker.date.soon({ days: 2 }),
  arrivalTime: faker.date.soon({ days: 3 }),
},
{
  trainName: faker.string.alpha({ length: 4, casing: 'upper' }),
  departureStation: `Paris`,
  arrivalStation: `Milan`,
  departureTime: faker.date.soon({ refDate: Date.now() }),
  arrivalTime: faker.date.between({ from: Date.now(), to: '2024-01-30T00:00:00.000Z' })

},
{
  trainName: faker.string.alpha({ length: 4, casing: 'upper' }),
  departureStation: `Paris`,
  arrivalStation: `Berlin`,
  departureTime: faker.date.soon({ days: 5 }),
  arrivalTime: faker.date.soon({ days: 10 }),
},
{
  trainName: faker.string.alpha({ length: 4, casing: 'upper' }),
  departureStation: `Paris`,
  arrivalStation: `Amsterdam`,
  departureTime: faker.date.soon({ days: 7 }),
  arrivalTime: faker.date.soon({ days: 14 }),
}
];

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  const trains = trainsArr
    .map((train, index) => ({
      id: index,
      train_name: train.trainName,
      departure_station: train.departureStation,
      arrival_station: train.arrivalStation,
      departure_time: train.departureTime,
      arrival_time: train.arrivalTime
    }));

  await knex(tableName).insert(trains.map(train => ({ ...train })));
};
