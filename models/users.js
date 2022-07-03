const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/resumake').then(()=>{
    console.log('database connection successfull..');
});

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
    // if(this.password.isModified()){
        let hash = await bcrypt.hash(this.password,10);
        this.password = hash;
    // }
    next();
});

const User = mongoose.model('user',userSchema);

module.exports = User;