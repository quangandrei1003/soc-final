import Model from "./model.js";

class TrainCarriageModel extends Model {
    static tableName = 'train_carriage_availability';
    static async create(data) {
        return super.insert({
            ...data
        });
    }
    static async getAllTrainAvailabilityByFilter(data) {
        try {
            let { departureStation, arrivalStation, departureTime, arrivalTime, carriageClass, limit, offset } = data;

            limit = (limit === null || limit === undefined) ? 10 : limit;

            offset = (offset === null || offset === undefined) ? 0 : offset;

            const selectedColumns = ['train_id', 'train.departure_station',
                'train.arrival_station',
                'train.departure_time', 'train.arrival_time',];

            let query = this.table.select(selectedColumns)
                .join('train', 'train.id', '=', 'train_carriage_availability.train_id')
                .join('carriage_class', 'carriage_class.id', '=', 'train_carriage_availability.carriage_class_id')
                .sum('train_carriage_availability.available_seat as available_seats')
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
            return trainDataRes;
        } catch (error) {
            console.log(error);
        }
    }

    static async getTrainAvailabilityByFilter(trainId) {
        try {
            const selectedColumns = ['train_id', 'seating_capacity', 'class_name'];
            const carriageInfo = await this.table.select(selectedColumns)
                .join('carriage_class', 'train_carriage_availability.carriage_class_id', '=', 'carriage_class.id')
                .where('train_id', '=', trainId);

            return carriageInfo;
        } catch (error) {
            console.log(error);
        }
    }

    static async getSeatAvailability(trainId, classType) {
        try {
            const [availableSeats] = await this.table.select('train_carriage_availability.available_seat')
                .join('carriage_class', 'train_carriage_availability.carriage_class_id', '=', 'carriage_class.id')
                .join('train', 'train.id', '=', 'train_carriage_availability.train_id')
                .where('train_id', '=', +trainId)
                .andWhere('train_carriage_availability.carriage_class_id', '=', classType);

            return availableSeats;
        } catch (error) {
            console.log(error);
            console.log(`getSeatAvailability error`);
        }
    }

    static async updateSeatAvailability(trainId, classType, remainingSeats) {
        try {
            const updateResponse = await this.table
                .where('train_id', '=', +trainId)
                .andWhere('carriage_class_id', '=', classType)
                .update('available_seat', remainingSeats);

            return updateResponse;
        } catch (error) {
            console.log(error);
            console.log(`getSeatAvailability error`);
        }
    }
}
export default TrainCarriageModel;