import mongoose from 'mongoose';
const offerSchema = new mongoose.Schema({ by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, amount: Number, note: String, createdAt: { type: Date, default: Date.now } }, { _id: false });
const bookingSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledAt: { type: Date, required: true }, proposedPrice: { type: Number, required: true, min: 1 }, agreedPrice: Number,
  status: { type: String, enum: ['pending', 'countered', 'accepted', 'rejected', 'in_progress', 'completed', 'cancelled'], default: 'pending' },
  offers: [offerSchema]
}, { timestamps: true });
export default mongoose.model('Booking', bookingSchema);
