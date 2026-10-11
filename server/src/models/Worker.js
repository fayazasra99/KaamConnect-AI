import mongoose from 'mongoose';
const workerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  profession: { type: String, required: true, trim: true }, skills: [{ type: String, trim: true }],
  experienceYears: { type: Number, default: 0, min: 0 }, hourlyRate: { type: Number, required: true, min: 1 },
  rating: { type: Number, default: 0, min: 0, max: 5 }, reviewCount: { type: Number, default: 0 },
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: [79.5941, 17.9689] } },
  city: { type: String, default: 'Warangal' }, serviceRadiusKm: { type: Number, default: 20 },
  availableDays: [{ type: String }], available: { type: Boolean, default: true }, portfolio: [{ url: String, caption: String }]
}, { timestamps: true });
workerSchema.index({ location: '2dsphere' });
export default mongoose.model('Worker', workerSchema);
