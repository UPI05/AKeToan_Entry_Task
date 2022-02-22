const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

exports.dbConnect = async () => {
  // Setup server
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  // Connect Db
  await mongoose.connect(uri, mongooseOpts);
  console.info('DB connected!');
};

exports.dbDisconnect = async () => {
  // Disconnect DB
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();

  // Stop server
  await mongoServer.stop();
};
