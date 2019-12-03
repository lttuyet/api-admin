const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const adminModel = require("../models/admin");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "username" }, (username, password, done) => {
      // Match admin
      adminModel.findAdminByUsername(username)
        .then(admin => {
          if (!admin) {
            return done(null, false, { message: "Tài khoản chưa đăng ký!" });
          }

          // Match password
          bcrypt.compare(password, admin.password, (err, isMatch) => {
            if (err) {
              throw err;
            }
            if (isMatch) {
              return done(null, admin);
            } else {
              return done(null, false, { message: "Thông tin đăng nhập không đúng!" });
            }
          });
        });
    })
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "your_jwt_secret"
      },
      function(jwtPayload, cb) {
        return admin.findAdminByUsername(jwtPayload.username)
          .then(admin => {
            return cb(null, admin);
          })
          .catch(err => {
            return cb(err);
          });
      }
    )
  );

  passport.serializeUser(function(admin, done) {
    done(null, admin._id);
  });

  passport.deserializeUser(function(id, done) {
    admin.findAdminByUsername(jwtPayload.username).then( (err, admin) =>{
        done(null, admin);
      });
  });
};
