import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({ booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true, unique: true }, reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, worker: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, rating: { type: Number, min: 1, max: 5, required: true }, comment: { type: String, maxlength: 1200 } }, { timestamps: true });
export default mongoose.model('Review', reviewSchema);
