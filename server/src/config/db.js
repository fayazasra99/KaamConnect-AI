import mongoose from 'mongoose';
export async function connectDatabase() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required. Copy server/.env.example to server/.env and set it.');
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}
