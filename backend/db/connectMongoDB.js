import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
       await mongoose.connect(process.env.MONGO_DB_URI);
       console.log("connected to MongoDB...")
    } catch (error) {
        console.error("error connecting to mongodb",error)
    }
}
export default connectDB;