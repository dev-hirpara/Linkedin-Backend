import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://devhirpara9999:6ydMz8b1FUAwjabl@cluster0.2rqx39k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;