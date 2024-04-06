const mongoose = require("mongoose");

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://umerkhayyam91:emmawatson123@meditourcluster.kuje42d.mongodb.net/?retryWrites=true&w=majority/jimwebsite", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB.");
    return mongoose.connection;
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error}`);
  }
};

module.exports = connect;
