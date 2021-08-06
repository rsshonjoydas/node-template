// ? external imports
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

// ? internal imports

dotenv.config();
const PORT = process.env.PORT || 5000;

const setupMongo = async () => {
  const uri = `${process.env.MONGO_CONNECTION_STRING}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const options: mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  try {
    await mongoose.connect(uri, options);
    console.log("database connection successfully!");
    mongoose.Promise = global.Promise;
  } catch (error) {
    console.log(error);
  }
};

const init = async (): Promise<void> => {
  let app = express();

  // ? request parser
  app.use(bodyParser.json());
  app.use(cors());

  // ? use route

  app.use("/", (req, res) => {
    res.send("RS Shonjoy Das" + new Date());
  });

  await setupMongo();

  await app.listen(5000);
  console.log(`app listing to port ${PORT}`);
};

init();
