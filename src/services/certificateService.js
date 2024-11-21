import axios from "axios";
const registerCertificateApi = async (id) => {
  let res = await axios.post(
    `http://localhost:8000/tao-khoa-nguoidung/${id}`,
  );
  return res;
};

const getDetailPkiApi = async (id) => {
  let res = await axios.get(
    `http://localhost:8000/chitiet-khoa/${id}`,
  );
  return res;
};

export {
    registerCertificateApi,
    getDetailPkiApi
};
