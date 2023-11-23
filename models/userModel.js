import {} from 'dotenv/config';
import mongoose from "mongoose";

const uri = process.env.MONGO_URI

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to MogoDb !!!!!!!!!!!!!!!!!!")
).catch((err)=> console.error(`Not Connected to MongoDb due to this error : ${err}`));

const userSchema = mongoose.Schema({
    name : {type:String,required:true} ,
    email : {type:String,required:true} ,
    pwd : {type:String,required:true} 
})

const userModel = mongoose.model("user Registration",userSchema)
export default userModel