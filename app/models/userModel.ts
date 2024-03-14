import mongoose  from "mongoose";
import bcrypt from "bcryptjs";
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please provide a name"]
    },
    username: {
        type: String,
        required: [true, "Please provide a unique username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});


//mongoose in built to save the password with a callback function
// UserSchema.pre("save", function(next){
//     const user = this;

//     if(this.isModified("password") || this.isNew){
//         bcrypt.genSalt(10, function(saltError, salt){
//             if(saltError)return next(saltError)
//             else bcrypt.hash(user.password, salt, function(hashError,hashPassword){
//             if(hashError){
//                 return next(hashError);
//             }
//                 user.password = hashPassword;
//                 next();
//         })
//         })
//     }else{
//         return next()
//     }
// })
//CHECK IF THE USER MODEL EXIST : GET , ELSE CREATE A SCHEMA
export default mongoose.models.user || mongoose.model("user",UserSchema);
