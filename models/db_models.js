const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/resumake').then(()=>{
    console.log('database connection successfull..');
});


//user schema
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});

userSchema.pre('save',async function(next){
    let hash = await bcrypt.hash(this.password,10);
    this.password = hash;
    next();
});

const User = mongoose.model('user',userSchema);

//resume schema
const resumeSchema = mongoose.Schema({
    name:{
        type: String,
        require:true
    },

    date:{
        type: String,
        require:true,
        default: new Date().toISOString().slice(0, 10)
    },
    
    user_mail:{
        type:String,
        require:true
    },

    data:{
        type:String,
        require:true
    }
});

const Resume = mongoose.model('Resume',resumeSchema);

//export
module.exports = { User, Resume };