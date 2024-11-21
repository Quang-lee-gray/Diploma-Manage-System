import axios from "axios";

// API function to add a diploma to the blockchain
const addDiplomaToBlockChainApi = async (
  diplomaId,
  issueDate,
  type,
  specialize,
  typeOfTraining,
  trainingFacility,
  rank,
  studentId,
  approverId,
  Idnguoidung // Thêm Idnguoidung thay vì Chuky, vì nó liên quan đến danh tính người dùng
) => {
  try {
    // Gửi yêu cầu POST tới backend
    const res = await axios.post("http://localhost:8000/blockchain/add", { // Đảm bảo endpoint đúng
      diplomaId,
      issueDate,
      type,
      specialize,
      typeOfTraining,
      trainingFacility,
      rank,
      studentId,
      approverId,
      Idnguoidung, // Đảm bảo bạn truyền đúng tham số cho Idnguoidung
    });

    // Trả về kết quả từ API
    return res.data;
  } catch (error) {
    console.error("Error adding diploma to blockchain:", error);
    throw error;
  }
};

export { addDiplomaToBlockChainApi };
