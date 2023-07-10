const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy

const User = require('../models/user');

const options = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'udit'
}

// structural mandation 
passport.use(new JwtStrategy(options , async function(jwtPayload, done){
    try {

        // console.log('JWT');

        let user = await User.findById(jwtPayload._id)
    
        if(!user || user.password !== jwtPayload.password){
            done(null , false)
        }
    
        done(null , user)
    } catch (error) {
        if(error){
            // console.log('Error in Jwt Strategy',error);
            done(error , false)
        }
    }

}))