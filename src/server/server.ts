import * as http from 'http';
import API from './api/api';

const models = require('./models');

const config = require('./config/env/config')();
const server = http.createServer(API);

models.sequelize.sync().then(() => {
  server.listen(config.serverPort);
  server.on('listening', () => console.log(`Server Running on port ${config.serverPort}`));
  server.on('error', (error: NodeJS.ErrnoException) => console.log(`Unexpected Exception: ${error}`));
});
