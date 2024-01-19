const mongoose=require('mongoose');


const connectToMongo=async ()=>{
    try{
       await mongoose.connect(process.env.MONGO_URI);
         console.log("db is connected successfully")
    }catch(error){
      console.log("Error occures while connecting with mongoDb",error)
    }
}
module.exports=connectToMongo;