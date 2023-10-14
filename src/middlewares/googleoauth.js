const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: "439414969048-1qosege0vemqo79etqns4r6983ada6jj.apps.googleusercontent.com",
    clientSecret: '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',
    callbackURL: "http://localhost:4001/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        // UserActivation.findOrCreate({ googleId, profile.id }, function (err, user) {
        //     return done(err, user);
        // })
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});


passport.deserializeUser(function (user, done) {
    done(null, user);
});