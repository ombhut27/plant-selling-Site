import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true, unique: true},
    password:{type:String,required:true},
    resetOtp: {type:String , default:''},
    resetOtpExpireAt:{type: Number, default : 0},
    cartData: { type: Object, default: {} },
    wishlistData: { type: Object, default: {} },
},{ minimize: false })

const userModel = mongoose.models.user || mongoose.model('user',userSchema)
export default userModel;