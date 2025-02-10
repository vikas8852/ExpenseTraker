import mongoose from "mongoose";

  const connectDB=async()=>{
  try{
// await mongoose.connect("mongodb://localhost:27017/track");
  await mongoose.connect(process.env.MONGO_URI);
    console.log("db connection succsfull")
  }
  catch(err){
    console.log(err);
  }
 }
 export default connectDB;