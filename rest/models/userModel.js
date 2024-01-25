import Model from "./model.js";

const Role = {
    Admin: 'admin',
    User: 'user'
};

const defaultUserRole = {
    role: Role.User
};

class UserModel extends Model {
    static tableName = 'user';
    static async create(data) {
        return super.insert({
            ...data,
            ...defaultUserRole
        });
    }
    static async findByEmail(email) {
        return this.table.where('email', '=', email);
    }

    static async findUserById(id) {
        const [user] = await this.table.where('id', '=', id).returning(['name', 'email', 'id', 'role']);
        return user;
    }
}

export default UserModel;