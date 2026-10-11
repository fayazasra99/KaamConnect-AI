import { Router } from 'express';
import { z } from 'zod';
import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import Worker from '../models/Worker.js';
import { requireAuth } from '../middleware/auth.js';
const router=Router();
router.post('/',requireAuth,async(req,res,next)=>{try{const x=z.object({bookingId:z.string(),rating:z.coerce.number().int().min(1).max(5),comment:z.string().max(1200).optional()}).parse(req.body);const booking=await Booking.findOne({_id:x.bookingId,customer:req.user.id,status:'completed'});if(!booking)return res.status(400).json({success:false,error:{code:'BOOKING_NOT_REVIEWABLE',message:'Only completed bookings can be reviewed.'}});const review=await Review.create({booking:booking.id,reviewer:req.user.id,worker:booking.worker,rating:x.rating,comment:x.comment});const worker=await Worker.findOne({user:booking.worker});if(worker){worker.rating=(worker.rating*worker.reviewCount+x.rating)/(worker.reviewCount+1);worker.reviewCount++;await worker.save();}res.status(201).json({success:true,data:{review}});}catch(e){next(e);}});
export default router;
