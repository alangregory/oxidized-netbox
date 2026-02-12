import { Model } from 'objection';
import connection from '../connection';
Model.knex(connection);

class DeviceModel extends Model {
    public name!: string;
    public model!: string;
    public ip!: string;

    static get tableName() {
        return 'devices';
    }
    static get idColumn() {
        return 'name';
    }
}

export default DeviceModel;