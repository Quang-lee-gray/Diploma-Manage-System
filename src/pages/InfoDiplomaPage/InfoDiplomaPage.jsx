import React from "react";
import { useLocation } from "react-router-dom";
import "./InfoDiplomaPage.scss";
const InfoDiplomaPage = () => {
  const location = useLocation();
  const diplomaData = location.state;

  return (
    <>
      <div className="info-diploma-container">
      <p className="result-text">Kết quả tra cứu</p>
      <div className="info-content">
        <div className="photo-section">
          <img src={diplomaData.student.image || "default-avatar.png"} alt="avatar" />
        </div>
        <div className="details-section">
          <div className="personal-info">
            <p><strong>Mã số SV/HS:</strong> {diplomaData.student.studentId}</p>
            <p><strong>Họ tên:</strong> {diplomaData.student.fullName}</p>
            <p><strong>Ngày sinh:</strong> {diplomaData.student.dateOfBirth}</p>
            <p><strong>Nơi sinh:</strong> {diplomaData.birthPlace}</p>
            <p><strong>Giới tính:</strong> {diplomaData.gender}</p>
          </div>
          <div className="academic-info">
            <p><strong>Ngành học:</strong> {diplomaData.specialize}</p>
            <p><strong>Chuyên ngành:</strong> {diplomaData.specialize}</p>
            <p><strong>Bậc đào tạo:</strong> Đại học</p>
            <p><strong>Loại hình đào tạo:</strong> {diplomaData.typeOfTraining}</p>
          </div>
        </div>
      </div>
      <div className="other-info">
          <p><strong>Khóa học:</strong> {diplomaData.student.yearOfAdmission}</p>
          <p><strong>Năm tốt nghiệp:</strong> {diplomaData.issueDate}</p>
          <p><strong>Xếp loại tốt nghiệp:</strong> {diplomaData.rank}</p>
          <p><strong>Số hiệu văn bằng:</strong> {diplomaData.diplomaId}</p>
          <p><strong>Ngày cấp:</strong> {diplomaData.issueDate}</p>
        </div>
    </div>
    </>
  );
};

export default InfoDiplomaPage;
