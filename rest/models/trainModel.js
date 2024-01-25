import Model from "./model.js";



class TrainModel extends Model {
    static tableName = 'train';
    static async create(data) {
        return super.insert({
            ...data
        });
    }
    static async findByEmail(email) {
        return this.table.where('email', '=', email);
    }

    static async getTrainByFilter(data) {


        try {
            let { departureStation, arrivalStation, departureTime, arrivalTime, carriageClass, limit, offset } = data;

            limit = (limit === null || limit === undefined) ? 10 : limit;

            offset = (offset === null || offset === undefined) ? 0 : offset;

            const selectedColumns = ['train_id', 'train.departure_station',
                'train.arrival_station',
                'train.departure_time', 'train.arrival_time',];

            let query = this.table.select(selectedColumns)
                .join('train_carriage_availability', 'train.id', '=', 'train_carriage_availability.train_id')
                .join('carriage_class', 'carriage_class.id', '=', 'train_carriage_availability.carriage_class_id')
                .sum('carriage_class.seating_capacity as available_seats')
                .groupBy(selectedColumns)
                .limit(limit)
                .offset(offset);

            if (departureStation) {
                query.where('departure_station', '=', departureStation);
            }
            if (arrivalStation) {
                query.where('arrival_station', '=', arrivalStation);
            }
            if (departureTime) {
                query.where('departure_time', '>=', departureTime);
            }
            if (arrivalTime) {
                query.where('arrival_time', '<=', arrivalTime);
            }
            if (carriageClass) {
                query.where('carriage_class.class_name', '=', carriageClass);
            }

            const trainDataRes = await query;

            console.log(`length: ${trainDataRes.length}`);

            return trainDataRes;
        } catch (error) {
            console.log(error);
        }
    }


    static async findUserById(id) {
        const [user] = await this.table.where('id', '=', id).returning(['name', 'email', 'id', 'role']);
        return user;
    }
}

export default TrainModel;