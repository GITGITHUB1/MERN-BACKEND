const mongoose=require('mongoose');

//UserSchema is defined to create a structure of the document that you want to set in the database
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:false
    }
})

// Now attach this structure defined with the project with models

const User=mongoose.model('USER',userSchema);
//Here User is a class model 
//Inside mongoose.model the first param is name of collection(which will be stored as plural and all lower case in the database.)

module.exports=User;