import React, { useState, useEffect } from "react";
import { message, Button, Table, Breadcrumb, Layout, Input,Modal,Upload } from "antd";
import {
  AuditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import {
  getAllStudentApi,
  updateStudentReissuedStatusApi
} from "../../services/studentService.js";
import { getDetailPkiApi } from "../../services/certificateService.js";
const { Header, Sider, Content } = Layout;
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: unset;
          }
        }
      }
    `,
  };
});
const { Search } = Input;
const ReissuedPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [filterStudent, setFilterStudent] = useState(dataSource);
  const [id, setId] = useState({});
  const [searchVal, setSearchVal] = useState("");
  const [fileContent, setFileContent] = useState("");

  const { styles } = useStyle();

  //get cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  let userInfo = JSON.parse(decodeURIComponent(getCookieValue("user")));

  const handleOpenModal = (_id) => {
    setId(_id);
    setOpen(!open);
    setFileContent("");
  }

  //upload file
  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(e.target.result); // Đọc nội dung tệp và cập nhật vào state
    };
    reader.readAsText(file);
    return false; // Ngăn chặn hành động tải lên mặc định của antd
  };

  //Yêu cầu
  const handleRequestDiploma = async () => {
    try{
      if(fileContent === ""){
        message.error("Bạn cần nhập khóa bí mật để xác thực!");
        return;
      }else{
        let res = await getDetailPkiApi(userInfo._id);
        if (fileContent.replace(/\s/g, "") === res.data.data.privateKey.replace(/\s/g, "")){
          await updateStudentReissuedStatusApi(id, true);
          message.success("Yêu cầu đã được gửi. Vui lòng chờ phê duyệt!");
          setOpen(false);
          fetchData();
        }else{
          message.error("Khóa bí mật không chính xác. Vui lòng thử lại!");
        }
      }
    }catch(err){
      message.error(err);
    }
  };

  const columns = [
    { title: "STT", dataIndex: "stt", width: 60, align: "center" },
    {
      title: "Ảnh",
      dataIndex: "img",
      width: 100,
      key: "img",
      align: "center",
      fixed: "left",
      render: (imgSrc) => (
        <img src={imgSrc} alt='student' style={{ width: 50, height: 60 }} />
      ),
    },
    {
      title: "Mã sinh viên",
      dataIndex: "masv",
      width: 100,
      align: "center",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 150,
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 200,
      align: "center",
    },
    {
      title: "CCCD",
      dataIndex: "cccd",
      width: 100,
      align: "center",
    },
    {
      title: "Điện thoại",
      dataIndex: "dt",
      width: 100,
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "ns",
      width: 120,
      align: "center",
    },
    {
      title:"Tiến độ",
      width: 127,
      dataIndex:"status",
      align: "center",
    },  
    {
      title: "Khoa",
      dataIndex: "khoa",
      width: 180,
      align: "center",
    },
    {
      title: "Khóa học",
      dataIndex: "year",
      width: 150,
      align: "center",
    },
    {
      title: "Xếp loại",
      dataIndex: "rank",
      width: 100,
      align: "center",
    },
    {
      title: "Tác vụ",
      key: "operation",
      fixed: "right",
      width: 100,
      align: "center",
      render: (record) => (
        <div>
          <Button
            title='Yêu cầu'
            type='primary'
            style={{
              width: "25px",
              color: record.isReissued === false ? "#fff" : record.isReissued === true  ? "#fff" : "",
              backgroundColor: record.isReissued === true ? "red" : "",
            }}
            disabled={
              record.isReissued === true
            }
            onClick={() => handleOpenModal(record.key)}>
            <a>
              <AuditOutlined />
            </a>
          </Button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      let student = await getAllStudentApi();

      const studentData = student.data.student.data;

      if (Array.isArray(studentData)) {
        const newDataSource = [];
        studentData.forEach((student, index) => {
          newDataSource.push({
            key: student._id,
            stt: index + 1,
            masv: student.studentId,
            name: student.fullName,
            address: student.address,
            dt: student.phoneNumber,
            ns: student.dateOfBirth,
            status: student.status === true ? "Đã hoàn thành" : "Đang học",
            cccd: student.CCCD,
            khoa: student.academicField,
            year: student.yearOfAdmission,
            img: student.image,
            rank:
              student.rank === 0
                ? "Giỏi"
                : student.rank === 1
                ? "Khá"
                : student.rank === 2
                ? "Trung bình"
                : student.rank === 3
                ? "Yếu"
                : "",
            isRequested: student.isRequested,
            isReissued: student.isReissued,
            approvals: student.approvals
          });
        });
        setDataSource(newDataSource);
        setFilterStudent(newDataSource);
      } else {
        console.error("Dữ liệu sinh viên không phải là một mảng:", studentData);
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleReloadData = async () => {
    await fetchData();
  };
  const handleSearchClick = () => {
    console.log(dataSource);
    if (searchVal === "") {
      setFilterStudent(dataSource); 
      return;
    }

    const filterBySearch = dataSource.filter((item) => {
      return (
        (item.masv &&
          item.masv.toLowerCase().includes(searchVal.toLowerCase())) || 
        (item.name && item.name.toLowerCase().includes(searchVal.toLowerCase())) 
      );
    });
    setFilterStudent(filterBySearch);
  };
  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Header */}
        <Header style={{ background: "#fff", padding: 0, margin: 0 }}>
          <HeaderComponent />
        </Header>

        <Layout>
          <MenuComponent />
          {/* Sidebar */}
          <Sider
            width={0}
            style={{
              background: "#fff",
            }}
          />

          {/* Main content */}
          <Layout style={{ padding: "24px" }}>
            <Content
              style={{
                padding: 24,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}>
              <Breadcrumb
                items={[
                  {
                    title: "Quản trị viên",
                  },
                  {
                    title: "Quản lý hệ thống",
                  },
                  {
                    title: "Cấp lại văn bằng",
                  },
                ]}
                style={{
                  margin: "16px 0",
                }}
              />
              <div className='manage'>
                <div className='d-flex justify-content-between' style={{ marginBottom: "10px" }}>
                  <div></div>
                  <div>
                    <Search
                      style={{ width: "300px", marginRight: "10px" }}
                      placeholder='Tìm kiếm sinh viên'
                      enterButton
                      onChange={(e) => setSearchVal(e.target.value)}
                      onSearch={handleSearchClick}
                    />
                    <Button
                      style={{ backgroundColor: "#00CC99", color: "#fff" }}
                      onClick={handleReloadData}>
                      <ReloadOutlined style={{ marginRight: "5px" }} />
                      Tải lại
                    </Button>
                  </div>
                </div>
                <Table
                  className={styles.customTable}
                  columns={columns}
                  dataSource={filterStudent}
                  bordered
                  pagination={{
                    pageSize: 3,
                    showSizeChanger: false,
                  }}
                  scroll={{
                    x: "max-content",
                    y: 55 * 5,
                  }}
                />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
       <Modal
        title="Nhập khóa bí mật của bạn để xác thực"
        visible={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Upload
          key="upload"
          beforeUpload={handleFileUpload}
          showUploadList={false}
          >
            <Button style={{  backgroundColor: "#CCCC00", color: "#fff", marginRight: "5px"}}>
              Tải tệp lên
            </Button>
          </Upload>,
          <Button type="primary" key="verify" onClick={handleRequestDiploma}>
            Xác thực
          </Button>
        ]}
      >
        <p>Private Key:</p>
        <Input  
          readOnly 
          rows={5} 
          style={{ width: '100%' }} 
          value={fileContent}/>
      </Modal>
    </>
  );
};

export default ReissuedPage;
