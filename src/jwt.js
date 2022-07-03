const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const jwt = require('jsonwebtoken');

async function getToken(data){
    const token = await jwt.sign(data,"myprivatekeyishardtocrack");
    return token;
}

getToken({name:'fucky', profession:'sucking'}).then((token)=>{
    console.log(token);
    console.log(jwt.verify(token,"myprivatekeyishardtocrack"));
});
console.log(process.env.SECRET_KEY);