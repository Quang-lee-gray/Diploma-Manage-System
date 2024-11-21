import Users from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//login user
const handleLoginUser = (data, res) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await Users.findOne({
        username: data.username,
      });
      if (!user) {
        resolve({
          errcode: 1,
          errmsg: "User does not exist!",
        });
      } else {
        let validatePassword = bcrypt.compareSync(data.password, user.password);
        if (!validatePassword) {
          resolve({
            errcode: 1,
            errmsg: "Wrong password!",
          });
        }
        if (user && validatePassword) {
          let accessToken = jwt.sign(
            {
              id: user._id,
              role: user.role,
            },
            process.env.JWT_ACCESS_KEY,
            { expiresIn: "5h" }
          );
          res.cookie("token", accessToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
          });
          resolve({
            errcode: 0,
            errmsg: "Login successfully.",
            user: user,
            token: accessToken,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

//check login
const handleAuthMiddleWare = (data) => {
  return new Promise((resolve, reject) => {
    try {
      let token = data.cookies.token;
      let userId = jwt.verify(token, process.env.JWT_ACCESS_KEY);

      let user = Users.findOne({
        _id: userId,
      });
      if (user) {
        resolve({
          errcode: 0,
          errmsg: "Permission!",
        });
      } else {
        resolve({
          errcode: 1,
          errmsg: "Not permission!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleLoginUser,
  handleAuthMiddleWare,
};
