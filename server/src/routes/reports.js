import { Router } from 'express';
import { z } from 'zod';
import Report from '../models/Report.js';
import { requireAuth } from '../middleware/auth.js';
const router=Router();
router.post('/',requireAuth,async(req,res,next)=>{try{const x=z.object({bookingId:z.string().optional(),category:z.string().min(2).max(80),details:z.string().min(10).max(3000)}).parse(req.body);const report=await Report.create({reporter:req.user.id,booking:x.bookingId,category:x.category,details:x.details});res.status(201).json({success:true,data:{report}});}catch(e){next(e);}});
export default router;
