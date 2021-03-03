const mongoose = require('mongoose');

const App = require('./app');
const Config = require('./config/config');
const Logger = require('./config/logger');
require('./models/index');

let server;
mongoose.connect(Config.datastores.default.url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  Logger.info('Connected to MongoDB');
  server = App.listen(Config.port, () => {
    Logger.info(`Listening to port ${Config.port}`);
  });
}).catch((error) => {
  console.log(error)
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  Logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  Logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
