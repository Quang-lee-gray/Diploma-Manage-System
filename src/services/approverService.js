import axios from "axios";
const getAllApproverApi = async () => {
  let res = await axios.get("http://localhost:8000/approver/get-all-approver");
  return res;
};

const getDetailApproverApi = async (_id) => {
  let res = await axios.get(
    `http://localhost:8000/approver/get-detail-approver/${_id}`,
    {
      _id: _id,
    }
  );
  return res;
};

const createApproverApi = async (
  approverId,
  fullName,
  phoneNumber,
  address,
  falculty,
  position,
  gender,
  isExist,
  isApprove
) => {
  let res = await axios.post(
    "http://localhost:8000/approver/create-new-approver",
    {
      approverId: approverId,
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: address,
      falculty: falculty,
      position: position,
      gender: gender,
      isExist: isExist,
      isApprove: isApprove
    }
  );
  return res;
};

const updateApproverApi = async (
  _id,
  approverId,
  fullName,
  phoneNumber,
  address,
  falculty,
  position,
  gender
) => {
  let res = await axios.put(
    `http://localhost:8000/approver/update-approver/${_id}`,
    {
      _id: _id,
      approverId: approverId,
      fullName: fullName,
      phoneNumber: phoneNumber,
      address: address,
      falculty: falculty,
      position: position,
      gender: gender,
    }
  );
  return res;
};
const deleteApproverApi = async (_id) => {
  let res = await axios.delete(
    `http://localhost:8000/approver/delete-approver/${_id}`,
    {
      _id: _id,
    }
  );
  return res;
};

const updateIsExistApi = async (_id, isExist) => {
  let res = await axios.put(
    `http://localhost:8000/approver/update-isExist/${_id}`,
    {
      _id: _id,
      isExist: isExist,
    }
  );
  return res;
};

const updateIsApproveApi = async (_id, isApprove) => {
  let res = await axios.put(
    `http://localhost:8000/approver/update-isApprove/${_id}`,
    {
      _id: _id,
      isApprove: isApprove,
    }
  );
  return res;
};


export {
  getAllApproverApi,
  createApproverApi,
  getDetailApproverApi,
  updateApproverApi,
  deleteApproverApi,
  updateIsExistApi,
  updateIsApproveApi
};
