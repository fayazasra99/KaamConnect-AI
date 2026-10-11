import mongoose from 'mongoose';
const reportSchema = new mongoose.Schema({ reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, category: { type: String, required: true }, details: { type: String, required: true, maxlength: 3000 }, status: { type: String, enum: ['open', 'reviewing', 'resolved'], default: 'open' } }, { timestamps: true });
export default mongoose.model('Report', reportSchema);
