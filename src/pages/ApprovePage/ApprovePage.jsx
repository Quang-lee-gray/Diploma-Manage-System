import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Upload, Input, message } from "antd";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import { useNavigate } from "react-router-dom";
import { getDetailPkiApi } from "../../services/certificateService.js";
import { createDiplomaApi } from "../../services/diplomaService.js";
import { updateProgressApi } from "../../services/progressServive.js";
import { updateStudentApproveStatusApi, updateApprovalsApi } from "../../services/studentService.js";
import { addDiplomaToBlockChainApi } from "../../services/blockchainService.js";
import "./ApprovePage.scss";

const { Header, Sider, Content } = Layout;

const ApprovePage = () => {
  const [fileContent, setFileContent] = useState("");  // Đây là khóa bí mật từ file upload
  const [isApproved, setIsApproved] = useState(false);

  let date = new Date();

  const location = useLocation();
  const student = location.state?.student || {};

  const navigate = useNavigate();

  const handleChangePage = () => {
    navigate("/nguoi-phe-duyet/danh-sach");
  };

  // Get cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  let userInfo = JSON.parse(decodeURIComponent(getCookieValue("user")));


  // Handle file upload
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result);  // Đọc nội dung file và cập nhật vào state
    };
    reader.readAsText(file);
    return false;
  };

  const handleApprove = async () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const issueDate = day + "/" + month + "/" + year;

    let res = await getDetailPkiApi(userInfo._id);

    // Kiểm tra khóa bí mật từ file upload với khóa bí mật trong cơ sở dữ liệu
    if (fileContent.replace(/\s/g, "") === res.data.data.privateKey.replace(/\s/g, "")) {

      // Cập nhật tình trạng phê duyệt
      await updateApprovalsApi(student._id, userInfo.approver._id, true);
      let response = await updateProgressApi(student._id);
      message.success("Phê duyệt văn bằng thành công.");
      setIsApproved(true);

      if (response.data.progress === 100) {
        // Cập nhật trạng thái sinh viên
        await updateStudentApproveStatusApi(student._id, true);
        
        // Tạo văn bằng mới
        await createDiplomaApi(
          `VB_${student.studentId}`,
          issueDate,
          "Cử nhân",
          student.academicField,
          "Chính quy",
          "Đại học Hồng Đức",
          student.rank === 0  ? "Giỏi" : student.rank === 1 ? "Khá" : student.rank === 2 ? "Trung bình" : "Yếu",
          student._id,
          userInfo.approver._id
        );

        // Gửi dữ liệu vào blockchain (sử dụng chữ ký thay vì Idnguoidung)
        const blockchainRes = await addDiplomaToBlockChainApi(
          `VB_${student.studentId}`,
          issueDate,
          "Cử nhân",
          student.academicField,
          "Chính quy",
          "Đại học Hồng Đức",
          student.rank === 0  ? "Giỏi" : student.rank === 1 ? "Khá" : student.rank === 2 ? "Trung bình" : "Yếu",
          student._id,
          userInfo.approver._id,
          userInfo._id, // ID người dùng (identity)
        );
  
        console.log("Blockchain response:", blockchainRes); 
      }
    } else {
      message.error("Khóa bí mật không chính xác!");
    }
  };


  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#fff", padding: 0, margin: 0 }}>
        <HeaderComponent />
      </Header>

      <Layout>
        <MenuComponent />
        <Sider width={0} style={{ background: "#fff" }} />

        <Layout style={{ padding: "24px" }}>
          <Content
            style={{
              margin: 0,
              padding: 24,
              background: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
            }}>
            <div className='container-fluid d-flex diploma-approval-container bg-light'>
              <div className='approval-img'>
                <div className='diploma-image-container'></div>
              </div>
              <div className='approval-panel d-flex'>
                <div className='approve'>
                  <h5 className='panel-title'>Phê duyệt</h5>
                  <Input  
                    readOnly 
                    placeholder="Tải khóa bí mật của bạn để xác thực..."
                    rows={5} 
                    style={{ width: '100%' }} 
                    value={fileContent}/>
                  <div className='d-flex justify-content-end'>
                    <Upload
                      key="upload"
                      beforeUpload={handleFileUpload}
                      showUploadList={false}
                    >
                      <button className='btn m-2' style={{backgroundColor: "#CCCC00", color: "#fff"}}>
                        Tải tệp lên
                      </button>
                    </Upload>
                    <button 
                      className='btn btn-primary m-2' 
                      onClick={handleApprove} 
                      disabled={isApproved}
                    >
                      Thông qua
                    </button>
                    <button
                      className='btn btn-danger m-2'
                      onClick={handleChangePage}>
                      Quay lại
                    </button>
                  </div>
                </div>

                <div className='info'>
                  <h5 className='panel-title'>Thông tin</h5>
                  <div className='d-flex'>
                    <div>
                      <p>Mã số HS/SV: {student.studentId}</p>
                      <p>Họ tên: {student.fullName}</p>
                      <p>CCCD: {student.CCCD}</p>
                      <p>Ngành học: {student.academicField}</p>
                      <p>Bậc đào tạo: Đại học</p>
                    </div>
                    <div>
                      <p>Loại hình đào tạo: Chính quy</p>
                      <p>Khóa học: {student.yearOfAdmission}</p>
                      <p>Năm tốt nghiệp: {date.getFullYear()}</p>
                      <p>
                        Xếp loại tốt nghiệp:
                        {student.rank === 0
                          ? "Giỏi"
                          : student.rank === 1
                          ? "Khá"
                          : student.rank === 2
                          ? "Trung bình"
                          : student.rank === 3
                          ? "Yếu"
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ApprovePage;
