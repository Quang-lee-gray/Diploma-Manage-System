import axios from "axios";
const getAllStudentApi = async () => {
  let res = await axios.get("http://localhost:8000/student/get-all-student");
  return res;
};

const getDetailStudentApi = async (_id) => {
  let res = await axios.get(
    `http://localhost:8000/student/get-detail-student/${_id}`,
    { _id: _id }
  );
  return res;
};

const deleteStudentApi = async (_id) => {
  let res = await axios.delete(
    `http://localhost:8000/student/delete-student/${_id}`,
    { _id: _id }
  );
  return res;
};

const updateStudentApi = async (
  _id,
  studentId,
  fullName,
  address,
  CCCD,
  nation,
  phoneNumber,
  dateOfBirth,
  status,
  category,
  academicField,
  yearOfAdmission,
  rank,
  image
) => {
  let res = await axios.put(
    `http://localhost:8000/student/update-student/${_id}`,
    {
      _id: _id,
      studentId: studentId,
      fullName: fullName,
      address: address,
      CCCD: CCCD,
      nation: nation,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      status: status,
      category: category,
      academicField: academicField,
      yearOfAdmission: yearOfAdmission,
      rank: rank,
      image: image,
    }
  );

  return res;
};

const createStudentApi = async (
  studentId,
  fullName,
  address,
  CCCD,
  nation,
  phoneNumber,
  dateOfBirth,
  status,
  category,
  academicField,
  yearOfAdmission,
  rank,
  image,
  isApprove
) => {
  let res = await axios.post(
    "http://localhost:8000/student/create-new-student",
    {
      studentId: studentId,
      fullName: fullName,
      address: address,
      CCCD: CCCD,
      nation: nation,
      phoneNumber: phoneNumber,
      dateOfBirth: dateOfBirth,
      status: status,
      category: category,
      academicField: academicField,
      yearOfAdmission: yearOfAdmission,
      rank: rank,
      image: image,
      isApprove: isApprove
    }
  );
  return res;
};

const updateStudentRequestStatusApi = (id, isRequested) => {
  return axios.put(`http://localhost:8000/student/request/${id}`, {
    id: id,
    isRequested: isRequested,
  });
};

const updateStudentApproveStatusApi = (id, isApprove) => {
  return axios.put(`http://localhost:8000/student/approve/${id}`, {
    id: id,
    isApprove: isApprove,
  });
};

const updateStudentReissuedStatusApi = (id, isReissued) => {
  return axios.put(`http://localhost:8000/student/reissued/${id}`, {
    id: id,
    isReissued: isReissued,
  });
};

const updateStudentCheckedApi = (id, isChecked) => {
  return axios.put(`http://localhost:8000/student/checked/${id}`, {
    id: id,
    isChecked: isChecked,
  });
};

const updateApprovalsApi = (studentId, approverId, isApproved ) => {
  return axios.post(`http://localhost:8000/student/update-approvals`, {
    studentId: studentId,
    approverId: approverId,
    isApproved: isApproved
  });
};

export {
  getAllStudentApi,
  getDetailStudentApi,
  createStudentApi,
  updateStudentApi,
  deleteStudentApi,
  updateStudentRequestStatusApi,
  updateStudentApproveStatusApi,
  updateStudentReissuedStatusApi,
  updateStudentCheckedApi,
  updateApprovalsApi
};
