const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        tcNo:{type:String,required:true},
        name:{type:String,required:false},
        surname:{type:String,required:true},
        password:{type:String,required:true},
    },
    );

UserSchema.set("timestamps",true);


const User = mongoose.model("users",UserSchema);
module.exports = User;