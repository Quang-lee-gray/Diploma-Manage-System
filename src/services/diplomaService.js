import axios from "axios";
const getAllDiplomaApi = async () => {
  let res = await axios.get("http://localhost:8000/diploma/get-all-diploma");
  return res;
};

const getDetailDiplomaApi = async (id) => {
  let res = await axios.post(
    `http://localhost:8000/diploma/get-detail-diploma`,
    {
      id: id,
    }
  );
  return res;
};

const createDiplomaApi = async (
  diplomaId,
  issueDate,
  type,
  specialize, //Chuyên ngành
  typeOfTraining, //Loại hình đào tạo(chính quy)
  trainingFacility, //Nơi cấp
  rank, //xếp loại
  student,
  approver, //Người ký
) => {
  let res = await axios.post(
    "http://localhost:8000/diploma/create-new-diploma",
    {
      diplomaId: diplomaId,
      issueDate: issueDate,
      type: type,
      specialize: specialize,
      typeOfTraining: typeOfTraining,
      trainingFacility: trainingFacility,
      rank: rank,
      student: student,
      approver: approver
    }
  );
  return res;
};

const updateDiplomaApi = async (
  _id,
  diplomaId,
  issueDate,
  type,
  specialize, //Chuyên ngành
  typeOfTraining, //Loại hình đào tạo(chính quy)
  trainingFacility, //Cơ sở đào tạo
  rank, //xếp loại
  student,
  approver,
) => {
  let res = await axios.put(
    `http://localhost:8000/diploma/update-diploma/${_id}`,
    {
      _id: _id,
      diplomaId: diplomaId,
      issueDate: issueDate,
      type: type,
      specialize: specialize,
      typeOfTraining: typeOfTraining,
      trainingFacility: trainingFacility,
      rank: rank,
      student: student,
      approver: approver
    }
  );
  return res;
};
const deleteDiplomaApi = async (_id) => {
  let res = await axios.delete(
    `http://localhost:8000/diploma/delete-diploma/${_id}`,
    {
      _id: _id,
    }
  );
  return res;
};

export {
  getAllDiplomaApi,
  createDiplomaApi,
  getDetailDiplomaApi,
  updateDiplomaApi,
  deleteDiplomaApi,
};
