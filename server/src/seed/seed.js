import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Worker from '../models/Worker.js';
const trades=[['Electrician',['wiring','lighting','repairs'],350],['Plumber',['pipes','fittings','leaks'],300],['Carpenter',['furniture','doors','woodwork'],400],['Painter',['interior','exterior','wall repair'],280],['Mason',['brickwork','tiling','plaster'],450]];
await mongoose.connect(process.env.MONGO_URI);
const passwordHash=await bcrypt.hash('Demo@1234',12);
for(const [i,[profession,skills,hourlyRate]] of trades.entries()){
 const email=`worker${i+1}@demo.com`;let user=await User.findOneAndUpdate({email},{$set:{name:['Ravi Kumar','Ananya Rao','Imran Shaikh','Meera Nair','Suresh Babu'][i],email,passwordHash,role:'worker'}},{upsert:true,new:true});
 await Worker.findOneAndUpdate({user:user.id},{$set:{profession,skills,hourlyRate,experienceYears:4+i,city:'Warangal',rating:4.5+i*.1,reviewCount:12+i,available:true,availableDays:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],location:{type:'Point',coordinates:[79.5941+i*.005,17.9689+i*.004]}}},{upsert:true,new:true});
}
await User.findOneAndUpdate({email:'customer@demo.com'},{$set:{name:'Demo Customer',email:'customer@demo.com',passwordHash,role:'customer'}},{upsert:true,new:true});
console.log('Seed complete. Demo customer and five workers use password Demo@1234.');await mongoose.disconnect();
