import mongoose from 'mongoose';

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI,);

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

export default connectToDB;
