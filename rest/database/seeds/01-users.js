/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

dotenv.config();

const tableName = 'user';
const defaultPassword = process.env.DEFAULT_PASSWORD;

export async function seed(knex) {
  // Deletes ALL existing entries
  await knex(tableName).del();
  const hashPassword = await bcrypt.hash(defaultPassword, 10);
  const users = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      email: faker.internet.email().toLowerCase(),
      name: faker.person.firstName(),
      role: 'user',
    }));

  await knex(tableName).insert(users.map(user => ({ ...user, password: hashPassword })));
};
