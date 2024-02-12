import Knex from 'knex';
import { database } from '../config/db.js';


class Model {
    static tableName;

    static get table() {
        if (!this.tableName) {
            throw new Error('You must set a table name!');
        }
        return database(this.tableName);
    }

    static async all({ limit = limit, offset = offset }) {
        return this.table.limit(limit).offset(offset);
    }

    static async insert(data) {
        const [result] = await this.table.insert(data).returning(['name', 'email', 'id', 'password']);
        return result;
    }

    static async update(id, data) {
        const [result] = await this.table.where({ id }).update(data).returning('*');
        return result;
    }

    static async delete(id) {
        return await this.table.where({ id }).del();
    }

    static async findById(id) {
        return await this.table.where('id', id).first();
    }

    static async findBy(data) {
        const [result] = await this.table.where(`${data}`, '=', data).first();
        return result;
    }
}

export default Model;