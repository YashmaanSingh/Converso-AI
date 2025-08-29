import mongoose from "mongoose";

export const connectDB = async () => {
  

    try{

        const{connection} = await mongoose.connect(process.env.MONGO_DB_URL, { dbName: "ConversoAI" });

    }
    catch(error){
        console.log("Failed To Connect With Databse", error);

    }
};