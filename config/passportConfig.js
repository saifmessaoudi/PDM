import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userModel from '../models/user.model.js';
import dotenv from 'dotenv';
dotenv.config();

const user = userModel.User;

passport.use(
    new GoogleStrategy(
        {
            // options for google strategy
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log('passport callback function fired:');
      
            const currentUser = await user.findOne({
                email: profile.emails[0].value,
            });
            if (currentUser) {
                googleAuthSignin(currentUser, accessToken, refreshToken, profile, done )
            } else {
               
            }
        }
    )
)

const googleAuthSignin = async (currentUser, accessToken, refreshToken, profile, done) => {
    return done(null, currentUser);
};


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

