// const User = require("../models/User.js");
// const bcrypt = require("bcryptjs");
// const { createError } = require("../utils/error.js");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const speakeasy = require("speakeasy");
// require("dotenv").config();

// exports.register = async (req, res, next) => {
//   // console.log(req.body)
//   const { email } = req.body;
//   const oldUser = await User.findOne({ email });

//   if (oldUser) {
//     return res.status(409).send("User Already Exist. Please Login");
//   } else {
//     bcrypt.genSalt(10, function (err, salt) {
//       bcrypt.hash(req.body.password, salt, function (err, hash) {
//         const user = {
//           username: req.body.username,
//           email: req.body.email,
//           password: hash,
//           isAdmin: req.body.isAdmin,
//         };

//         // console.log(user);
//         User.create(user)
//           .then((result) => {
//             res.status(201).json({
//               result: result,
//               message: "User created successfully",
//             });
//           })
//           .catch((error) => {
//             res.status(500).json({
//               message: error.message,
//             });
//           });
//       });
//     });
//   }
// };

// exports.login = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or username!"));

//     const token = await jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_TOKEN_SECRET
//     );

//     // console.log(token);
//     const { password, isAdmin, ...otherDetails } = user._doc;
//     sendOTPVerificationEmail({ ...otherDetails }, res);
//     res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.logout = async (req, res, next) => {
//   try {
//     return res
//       .clearCookie("access_token")
//       .json({ message: "Déconnectez-vous avec succès" });
//   } catch (error) {
//     next(error);
//   }
// };

// const transporter = nodemailer.createTransport({
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USER,
//     pass: process.env.MAIL_PASS,
//   },
// });

// const sendOTPVerificationEmail = async ({ _id, email }, res) => {
//   try {
//     const tmp_secret = speakeasy.generateSecret({ name: process.env.APP_NAME });

//     var otp = speakeasy.totp({
//       secret: tmp_secret.base32,
//       encoding: "base32",
//       time: 1453853945,
//       step: 240,
//       window: 100,
//       counter: 123,
//     });

//     await User.updateOne(
//       { _id },
//       { $set: { secretBase32: tmp_secret.base32 } }
//     );

//     const mailOptions = {
//       from: process.env.MAIL_FROM,
//       to: email,
//       subject: "Verify Email",
//       html: `<p> Enter <b>${otp}</b> in the app to verify your email address and complete the login verification </br> this code will expires in 10 minutes  </p> `,
//     };

//     await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.log(error);
//   }
// };

// exports.verifyOTP = async (req, res, next) => {
//   try {
//     const userId = req.body.data.details._id;
//     const user = await User.findOne({ where: { _id: userId } });
//     const secret = user.secretBase32;
//     const token = req.body.data.token;
//     const code = req.body.otp;

//     console.log(code);
//     console.log(secret);

//     // console.log(speakeasy.decode(secret));
//     // const verified = _verifyTwoFAToken(secret, code);
//     const verified = speakeasy.totp.verify({
//       secret: secret,
//       token: code,
//       encoding: "base32",
//       time: 1453853945,
//       step: 240,
//       window: 100,
//       counter: 123,
//     });
//     console.log(verified);
//     // if (!user) throw new ApiError("Aucun compte existant");
//     // if (!verified) throw new ApiError(`${code} Code is incorrect !`);
//     // if (verified && !user.twoFAEnabled)
//     //   await user.updateOne({ $set: { twoFAEnabled: true } });

//     // return res
//     //   .cookie("access_token", token, {
//     //     httpOnly: true,
//     //     secure: true,
//     //     sameSite: "none",
//     //   })
//     //   .json(user);
//   } catch (error) {
//     next(error);
//   }
// };

// function _verifyTwoFAToken(secret, code) {
//   return speakeasy.totp.verify({
//     secret: secret,
//     token: code,
//     encoding: "base32",
//     time: 1453853945,
//     step: 240,
//     window: 100,
//     counter: 123,
//   });
// }

// exports.sendToken = async (req, res, next) => {
//   const token = req.cookies.access_token;
//   res.send(token);
// };

const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
require("dotenv").config();

exports.register = async (req, res, next) => {
  // console.log(req.body)
  const { email } = req.body;
  const oldUser = await User.findOne({ email });

  if (oldUser) {
    return res.status(409).send("User Already Exist. Please Login");
  } else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        const user = {
          username: req.body.username,
          email: req.body.email,
          password: hash,
          isAdmin: req.body.isAdmin,
        };

        // console.log(user);
        User.create(user)
          .then((result) => {
            res.status(201).json({
              result: result,
              message: "User created successfully",
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: error.message,
            });
          });
      });
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET
    );

    // console.log(token);
    const { password, isAdmin, ...otherDetails } = user._doc;
    sendOTPVerificationEmail({ ...otherDetails }, res);
    res.status(200).json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    return res
      .clearCookie("access_token")
      .json({ message: "Déconnectez-vous avec succès" });
  } catch (error) {
    next(error);
  }
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendOTPVerificationEmail = async ({ _id, email }, res) => {
  try {
    const tmp_secret = speakeasy.generateSecret({ name: process.env.APP_NAME });

    var otp = speakeasy.totp({
      secret: tmp_secret.base32,
      encoding: "base32",
      time: 1453853945,
      step: 240,
      window: 100,
      counter: 123,
    });

    await User.updateOne(
      { _id },
      { $set: { secretBase32: tmp_secret.base32 } }
    );

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "Verify Email",
      html: `<p> Enter <b>${otp}</b> in the app to verify your email address and complete the login verification </br> this code will expires in 10 minutes  </p> `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

exports.verifyOTP = async (req, res, next) => {
  try {
    const userId = req.body.data.details._id;
    const user = await User.findOne({ _id: userId });
    const secret = user.secretBase32;
    const token = req.body.data.token;
    const code = req.body.otp;

    const verified = speakeasy.totp.verify({
      secret: secret,
      token: code,
      encoding: "base32",
      time: 1453853945,
      step: 240,
      window: 100,
      counter: 123,
    });

    console.log(verified);
    //  _verifyTwoFAToken(secret,code)
    // if (!user) return next(createError(404, "User not found!"));
    // if (!verified) return next(createError(404, `${code} Code is incorrect !`));
    // if (verified && !user.twoFAEnabled)
    //   await User.updateOne({ $set: { twoFAEnabled: true } });

    // return res
    //   .cookie("token", token, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "none",
    //   })
    //   .json(user);
  } catch (error) {
    next(error);
  }
};

function _verifyTwoFAToken(secret, code) {
  return speakeasy.totp.verify({
    secret: secret,
    token: code,
  });
}

exports.sendToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  res.send(token);
};
