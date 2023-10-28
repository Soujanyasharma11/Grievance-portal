const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false, message: "User not authenticated" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    req.userId = data.userId
    next()
    // const user = await User.findById(data.id);

    // if (user) {
    //   return res.json({ status: true, user: user.username });
    // } else {
    //   return res.json({ status: false });
    // }
  } catch (err) {
    return res.json({ status: false, message: "Token verification failed" });
  }
};
