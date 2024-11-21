import axios from "axios";
const createRegister = async (status, student) => {
  let res = await axios.post("http://localhost:8000/register-diploma", {
    status: status,
    student: student,
  });
  return res;
};

export { createRegister };
