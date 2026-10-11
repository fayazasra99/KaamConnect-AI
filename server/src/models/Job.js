import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true, trim: true, maxlength: 120 }, description: { type: String, required: true, maxlength: 2000 },
  profession: { type: String, required: true }, skills: [String], budgetMin: { type: Number, min: 0 }, budgetMax: { type: Number, min: 0 },
  location: { type: { type: String, enum: ['Point'], default: 'Point' }, coordinates: { type: [Number], default: [79.5941, 17.9689] } },
  city: { type: String, default: 'Warangal' }, preferredDate: Date, preferredSlot: String,
  status: { type: String, enum: ['open', 'booked', 'completed', 'cancelled'], default: 'open' }
}, { timestamps: true });
jobSchema.index({ location: '2dsphere' });
export default mongoose.model('Job', jobSchema);
