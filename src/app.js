
//import packages
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");

require('dotenv').config({path: path.join(__dirname, '../.env')});

const auth = require('./auth.js');
const User = require('../models/users.js');
const session = require('express-session');

const port = process.env.PORT || 8888;
const static_path = path.join(__dirname, '../public');
const partials_path = path.join(__dirname, '../views/partials');
const views_path = path.join(__dirname, '../views');

//express related
const app = express();
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(session({secret:process.env.SESSION_KEY}));


//handlebar related
app.set('view engine', 'hbs');
hbs.registerPartials(partials_path);

//endpoints
app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/login', (req, res) => {
    res.status(200).render('login');
});

app.post('/login', async (req, res) => {
    try {
        let data = await User.findOne({email:req.body.email}).exec();

        if(data==null) throw new Error('No such email registered');

        let inputPassword = req.body.password;

        let valid = await bcrypt.compare(inputPassword,data.password);
        
        if(valid){
            let token = await jwt.sign({id:data._id},process.env.SECRET_KEY);
            res.cookie('jwt',token);
            // res.send(req.cookies.jwt);
            res.redirect('/dashboard');
        }
        else throw new Error('PAssword mismatch');


    } catch (error) {
        // console.log(error);
        res.status(400).send(error.message);
    }
});

app.get('/signup', (req, res) => {
    res.status(200).render('signup');
});

app.post('/signup', async (req, res) => {
    try {
        
        if (req.body.password === req.body.cnfPassword) {
            let thisUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            try {
                let result = await thisUser.save();
                let token = jwt.sign({id:result._id},process.env.SECRET_KEY);
                res.cookie('jwt',token);
                res.redirect('/dashboard');
            } catch (error) {
                console.log(error);
                res.status(400).send('email already registered');
            }
            
        }
        else {
            res.send("Password and confirm password not matched");
        }

    } catch (error) {
        res.status(400).send('error');
    }
});

app.get('/dashboard',async (req,res)=>{
    try {
        
        const jwt_cookie = req.cookies.jwt;
        if(jwt_cookie==null){
            res.redirect('/login');
            // throw new Error('Please Login first');
        }
        else{
            let authorise = await auth(req.cookies.jwt);
            // console.log(authorise);
            if(authorise.authorised){
                let data  = await User.findOne({_id:authorise.id}).exec();
                // console.log(data);
                res.render('dashboard',{name:data.name, email:data.email});
            }
            else throw new Error(authorise.message);
        }
    } catch (error) {
        res.send(error.message);
    }
    
});

app.get('/create_resume',(req,res)=>{
    res.status(200).render('create_resume');
});

app.post('/create_resume',(req,res)=>{
    let obj = {};
    obj.name = req.body.uname;
    obj.place = req.body.uplace;
    obj.dob = req.body.udob;
    obj.phone = req.body.uphone;
    obj.email = req.body.umail;
    obj.linkedin = req.body.ulinkedin;
    obj.college = req.body.ucollege;
    if('uportTitle' in req.body){
        obj.portTitle = req.body.uportTitle;
    }

    console.log(req.body);
    res.send(obj);

});

app.get('/resume',(req,res)=>{
    res.render('resume/simple');
});

app.get('/logout',(req,res)=>{
    res.clearCookie('jwt');
    res.redirect('/');
})


//listen
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});