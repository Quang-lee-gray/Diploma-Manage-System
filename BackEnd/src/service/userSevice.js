import Users from "../models/user";
import bcrypt from "bcryptjs";
var salt = bcrypt.genSaltSync(10);

//get data user
const handleGetAllUsers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await Users.find(
        {},
        {
          password: 0,
        }
      );
      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

//get detail user
const handleGetDetailUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkUser = await Users.findOne({
        _id: userId,
      });
      if (checkUser) {
        resolve({
          errcode: 0,
          errmsg: "",
          user: checkUser,
        });
      } else {
        resolve({
          errcode: 1,
          errmsg: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//create a new user
const handleCreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await Users.findOne({
        email: data.email,
      }).exec();
      if (user) {
        resolve({
          errcode: 1,
          errmsg: "User already exists!",
        });
      } else {
        let hashPassword = await bcrypt.hashSync(data.password, salt);
        let newUsers = await new Users({
          username: data.username,
          password: hashPassword,
          email: data.email,
          address: data.address,
          role: data.role,
        });
        let saveUsers = await newUsers.save();

        resolve({
          errcode: 0,
          errmsg: "Create a new user successfully!",
          user: saveUsers,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//delete a user
const handleDeleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      //Use update many to update linked table
      if (userId) {
        let deleteUser = await Users.findByIdAndDelete(userId);
        if (deleteUser) {
          resolve({
            errcode: 0,
            errmsg: deleteUser,
          });
        } else {
          resolve({
            errcode: 0,
            errmsg: "Delete a user failed!",
          });
        }
      } else {
        resolve({
          errcode: 1,
          errmsg: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

//update a user
const handleUpdateUser = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await Users.findOne({
        _id: userId,
      }).exec();
      if (user) {
        let updateUser = await Users.findByIdAndUpdate(userId, data);
        if (updateUser) {
          resolve({
            errcode: 1,
            errmsg: "Update user successfully!",
            user: updateUser,
          });
        } else {
          resolve({
            errcode: 1,
            errmsg: "Update user failed!",
          });
        }
      } else {
        resolve({
          errcode: 1,
          errmsg: "User not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleGetAllUsers,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  handleGetDetailUsers,
};
