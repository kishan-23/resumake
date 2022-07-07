
//import packages
const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require("cookie-parser");
const session = require('express-session');
var flash = require('req-flash');

require('dotenv').config({path: path.join(__dirname, '../.env')});

const auth = require('./auth.js');
const {User,Resume} = require('../models/db_models.js');
const resutils = require('./resume_utils.js');

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
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}));
app.use(flash());

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
            req.session.user_mail = data.email;
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
                req.session.user_mail = req.body.email;
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
        console.log(req.session);
        const jwt_cookie = req.cookies.jwt;
        if(jwt_cookie==null){
            res.redirect('/login');
        }
        else{
            let authorise = await auth(req.cookies.jwt);
            if(authorise.authorised){
                let userData  = await User.findOne({_id:authorise.id}).exec();
                req.session.user_mail = userData.email;
                let resume_find_query = Resume.find({user_mail:userData.email});
                resume_find_query.select('_id name date');
                let resume_list = await resume_find_query.exec();
                res.render('dashboard',{uname:userData.name, uemail:req.session.user_mail, resumes:resume_list});
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
    let obj = resutils(req.body);
    req.session.resume = obj;
    res.redirect('/preview_resume');
});

app.get('/preview_resume',(req,res)=>{
    res.render(`resume/${req.session.resume.resume_format}`,req.session.resume);
});

app.get('/preview_resume/:id',async (req,res)=>{
    try {
        // console.log('here');
        let result = await Resume.findOne({_id:req.params.id}).select('data').exec();
        // console.log(result);
        let resumeData = JSON.parse(result.data);
        // console.log(resumeData.resume_format);
        res.render(`resume/${resumeData.resume_format}`,resumeData);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/logout',(req,res)=>{
    res.clearCookie('jwt');
    req.session.destroy((err)=>{
        res.send(err.message);
    })
    res.redirect('/');
})

app.post('/save_resume',async (req,res)=>{
    let resume_model = new Resume({
        name: req.body.name,
        user_mail: req.session.user_mail,
        data: JSON.stringify(req.session.resume),
    });

    try {
        let result = await resume_model.save();
        // res.send('Succesfully saved');
        req.flash('message','succesfully saved');
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get('/delete/:id',async(req,res)=>{
    try {
        let result = await Resume.deleteOne({_id:req.params.id}).exec();
        // console.log(result);
        req.flash('message','successfully deleted');
        res.redirect('/dashboard');
    } catch (error) {
        req.flash('message',error.message);
    }
})

// //something necessary
// hbs.registerHelper('exist', function (obj) {
//     return obj.length;
// });

//listen
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});