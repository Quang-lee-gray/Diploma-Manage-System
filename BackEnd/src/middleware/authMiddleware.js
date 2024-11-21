import { handleAuthMiddleWare } from "../service/authService";

//check verify token login
const authMiddleWare = (req, res, next) => {
  let check = handleAuthMiddleWare(req);
  if (check) {
    res.status(200).json({
      check: check,
    });
    next();
  } else {
    res.status(404).json({
      check: check,
    });
  }
};

module.exports = { authMiddleWare };
