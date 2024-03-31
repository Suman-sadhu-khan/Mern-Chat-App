const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        const  conn=await mongoose.connect(process.env.MONGO_URL);

        console.log(`mongoDB connected ${conn.connection.host}`.green.bold)
    }
    catch(error){
        console.log(`Error: ${error.message}`.red.bold);
        process.exit();
    }
}

module.exports=connectDB;