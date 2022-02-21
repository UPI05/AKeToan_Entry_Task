import app from './server';
import dbConnect from './models/dbConnect';

const startServer = async () => {
  dbConnect();
  app.listen(process.env.PORT || 3000, () => {
    console.info(`App is running at http://localhost:${process.env.PORT || 3000}`);
  });
};

startServer();
