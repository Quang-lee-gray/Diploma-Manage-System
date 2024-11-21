import { handleLoginUser, handleCheckLogin } from "../service/authService";
//login user
const loginUser = async (req, res) => {
  let user = await handleLoginUser(req.body, res);
  if (user) {
    return res.status(200).json({
      user: user,
    });
  } else {
    return res.status(404).json({
      errcode: 1,
      errmsg: "Login failed!",
    });
  }
};

module.exports = {
  loginUser,
};
