import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`connection database: ${connection.connection.host} `);
  } catch (error) {
    console.log(`Error ${error}`);
  }
};

export default connectDB;
