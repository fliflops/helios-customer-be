const JwtStrategy    = require('passport-jwt').Strategy;
const BearerStrategy = require('passport-http-bearer');
const { ExtractJwt } = require('passport-jwt');

const { jwtSecret } = require('./vars');
const userService = require('../api/services/user.service');
const APIError = require('../api/errors/api-error');

// A number of extractor factory functions are provided in passport-jwt.ExtractJwt. These factory functions return a new extractor configured with the given parameters.

// fromHeader(header_name) creates a new extractor that looks for the JWT in the given http header
// fromBodyField(field_name) creates a new extractor that looks for the JWT in the given body field. You must have a body parser configured in order to use this method.
// fromUrlQueryParameter(param_name) creates a new extractor that looks for the JWT in the given URL query parameter.
// fromAuthHeaderWithScheme(auth_scheme) creates a new extractor that looks for the JWT in the authorization header, expecting the scheme to match auth_scheme.
// fromAuthHeaderAsBearerToken() creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'
// fromExtractors([array of extractor functions]) creates a new extractor using an array of extractors provided. Each extractor is attempted in order until one returns a token.


const jwtOptions = {
    secretOrKey: jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

//handles the jwt authorization
const jwt = async(payload,done)=>{
    try{
        console.log(payload.user_id)
        //payload = verified result of the jsonwebtoken
        //done = is a passport error first callback accepting arguments done(error, user, info)
        const user = await userService.getByID(payload.user_id)
  
        if (user) return done(null, user);
    
        return done(null,false)
    }
    catch(e){
        done(e,false)
    }
}

exports.jwt = new JwtStrategy(jwtOptions, jwt)




