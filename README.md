# oxidized-netbox
## setup
- install
```bash
npm install --omit=dev
```
- create and update values on **config/production.json**
- run database migrations
```bash
npx knex migrate:latest
```
- setup with pm2
```bash
pm2 start ecosystem.config.js
pm2 save
```