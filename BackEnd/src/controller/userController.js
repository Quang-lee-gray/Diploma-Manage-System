import {
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetDetailUsers,
} from "../service/userSevice";

//get user with id
const getAllUsers = async (req, res) => {
  let user = await handleGetAllUsers();
  if (user) {
    return res.status(200).json({
      errcode: 0,
      errmsg: "Successfully!",
      user: user,
    });
  } else {
    return res.status(500).json({
      errcode: 1,
      errmsg: "Failed!",
      user: [],
    });
  }
};

//get detail user
const getDetailUsers = async (req, res) => {
  let user = await handleGetDetailUsers(req.params.id);
  if (user) {
    return res.status(200).json({
      user: user,
    });
  } else {
    return res.status(404).json({
      user: user,
    });
  }
};

//create a new user
let createNewUser = async (req, res) => {
  let user = await handleCreateNewUser(req.body);
  if (user) {
    return res.status(200).json({
      user: user,
    });
  } else {
    return res.status(404).json({
      errcode: 1,
      errmsg: "Not created user!",
    });
  }
};

//delete user
let deleteUser = async (req, res) => {
  let user = await handleDeleteUser(req.params.id);
  if (user) {
    return res.status(200).json({
      user: user,
    });
  } else {
    return res.status(404).json({
      user: user,
    });
  }
};

//update user
let updateUser = async (req, res) => {
  let userId = req.params.id;
  let data = req.body;
  let user = await handleUpdateUser(userId, data);
  if (user) {
    return res.status(200).json({
      user: user,
    });
  } else {
    return res.status(404).json({
      user: user,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUser,
  getDetailUsers,
};
