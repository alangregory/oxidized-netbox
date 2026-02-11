interface KnexConfig {
    [index: string]: Record<string, unknown>
}
const config: KnexConfig = {
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
export default config;