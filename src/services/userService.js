import axios from "axios";
const getAllUserApi = async () => {
  let res = await axios.get("http://localhost:8000/user/get-all-user");
  return res;
};
const getDetailUserApi = async (id) => {
  let res = await axios.get(
    `http://localhost:8000/user/get-detail-user/${id}`,
    { id: id }
  );
  return res;
};

const createUserApi = async (username, password, email, role, approver, isSignature) => {
  let res = await axios.post("http://localhost:8000/user/create-new-user", {
    username: username,
    password: password,
    email: email,
    role: role,
    approver: approver,
    isSignature: isSignature
  });
  return res;
};

const updateSignatureApi = async (id, isSignature) => {
  let res = await axios.put(`http://localhost:8000/user/update-signature/${id}`, {
    id:id,
    isSignature:isSignature
  });
  return res;
};


const deleteUserApi = async (_id) => {
  let res = await axios.delete(
    `http://localhost:8000/user/delete-user/${_id}`,
    { _id }
  );
  return res;
};

export { getAllUserApi, getDetailUserApi, createUserApi, deleteUserApi,updateSignatureApi };
