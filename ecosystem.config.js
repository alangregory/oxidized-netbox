module.exports = {
    apps: [{
        name: 'stake-check',
        script: './dist/src/services/sync.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '2G',
        env: {
            NODE_ENV: 'production'
        }
    }],
};