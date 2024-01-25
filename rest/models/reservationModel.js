import Model from "./model.js";

class ReservationModel extends Model {
    static tableName = 'reservation';
    static async makeReservation(data) {
        try {
            const [result] = await this.table.insert(data).returning('*');
            return result;
        } catch (error) {
            console.log(`make reservation error`);
            console.log(error);
        }
    }
}

export default ReservationModel;