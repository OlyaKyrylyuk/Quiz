import mongoose from "mongoose";
type DBInput = {
  db: string;
};
export default ({ db }: DBInput) => {
  const Connection = () => {
    mongoose
      .connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return console.info(`Successfully connected to ${db}`);
      })
      .catch((err) => {
        console.error(`Error connecting to database :`, err);
        return process.exit(1);
      });
  };
  Connection();
  mongoose.connection.on("disconnected", Connection);
};
