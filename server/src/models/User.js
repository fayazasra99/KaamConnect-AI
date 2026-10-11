import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 90 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ['customer', 'worker', 'contractor', 'admin'], default: 'customer' },
  phone: { type: String, trim: true },
  preferredLanguage: { type: String, enum: ['en', 'hi', 'te'], default: 'en' }
}, { timestamps: true });
export default mongoose.model('User', userSchema);
