"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    "development": {
        client: 'sqlite3',
        connection: {
            filename: 'storage/database.sqlite3'
        },
        migrations: {
            directory: 'src/database/migrations'
        },
        useNullAsDefault: true
    },
    "production": {
        client: 'sqlite3',
        connection: {
            filename: 'storage/database.sqlite3'
        },
        migrations: {
            directory: 'src/database/migrations'
        },
        useNullAsDefault: true
    },
};
exports.default = config;
