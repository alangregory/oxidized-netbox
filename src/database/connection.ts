import knex from 'knex';
import config from '../../knexfile';
let env = process.env.NODE_ENV;
if (!env) {
    env = "development";
}
export default knex(config[env]);