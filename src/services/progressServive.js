import axios from "axios";
const createProgressApi = async (progress, student) => {
  let res = await axios.post(
    `http://localhost:8000/tien-trinh`,{
        progress: progress,
        student: student
    }
  );
  return res;
};

const updateProgressApi = async (id) => {
  let res = await axios.put(
    `http://localhost:8000/cap-nhat-tien-trinh/${id}`
  );
  return res;
};

export {
    createProgressApi,
    updateProgressApi
};
