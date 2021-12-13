'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const bcrypt = require('bcryptjs');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const { getUserLogin } = require('../models/userModel');

// local strategy for username password login
passport.use(new Strategy(
    async (Username, Password, done) => {
      const params = [Username];
      try {
        const [user] = await getUserLogin(params);
        console.log('Local strategy', user); // result is binary row
        if (!user) {
          return done(null, false);
        }
        // TODO: use bcrypt to check of passwords don't match
        if (!bcrypt.compareSync(Password, user.Password)) {
          return done(null, false);
        }
        //  if (Password !== user.Password) {
        //   return done(null, false);
        // }
        // delete user.password; // remove password propety from user object if it's still there
        return done(null, {...user}, {message: 'Logged In Successfully'}); // use spread syntax to create shallow copy to get rid of binary row type
      } catch (err) {
        return done(err);
      }
    }));

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), 
            secretOrKey: 'dowöhiwf',
        },
        (jwtPayload, done) => {
            console.log('payload', jwtPayload);
            done(null, jwtPayload);
        }
    )
);


module.exports = passport;