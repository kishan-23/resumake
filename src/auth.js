const jwt = require('jsonwebtoken');

async function auth(token){
    try {
        let obj = await jwt.verify(token,process.env.SECRET_KEY);
        return {
            authorised: true,
            id: obj.id,
            message: 'ok'
        }
    } catch (error) {
        let obj = {
            authorised: false,
            message: error.message
        }
        return obj;
    }
    
}

module.exports = auth;