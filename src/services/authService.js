import axios from "axios";
const loginApi = async (username, password) => {
  let res = await axios.post("http://localhost:8000/login", {
    username: username,
    password: password,
  });
  return res;
};

const ChangePasswordApi = async (
  _id,
  oldPassword,
  newPassword,
  confirmPassword
) => {
  let res = await axios.post("http://localhost:8000/change-password", {
    _id: _id,
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  });
  return res;
};

const logoutApi = async () => {
  let res = await axios.post("http://localhost:8000/logout");
  return res;
};

export { loginApi, ChangePasswordApi, logoutApi };
