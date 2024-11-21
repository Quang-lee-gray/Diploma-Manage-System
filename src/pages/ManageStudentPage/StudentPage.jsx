import React, { useState, useEffect } from "react";
import { message, Button, Flex, Table, Breadcrumb, Layout, Input, Modal, Upload } from "antd";
import {
  FormOutlined,
  PlusCircleOutlined,
  InfoCircleOutlined,
  AuditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import {
  getAllStudentApi,
  getDetailStudentApi,
  updateStudentRequestStatusApi,
} from "../../services/studentService.js";
import { createRegister } from "../../services/registerDiplomaService.js";
import CreateStudentComponent from "../../components/CreateStudentComponent/CreateStudentComponent";
import DetailStudentComponent from "../../components/DetailStudentComponent/DetailStudent";
import UpdateStudentComponent from "../../components/UpdateStudentComponent/UpdateStudent";
import { getDetailPkiApi } from "../../services/certificateService.js";
import { createProgressApi } from "../../services/progressServive.js";
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
const StudentPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [open, setOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedStudentId, setSelectedStudentId] = useState("");
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

  const handleOpenDetailStudent = async (_id) => {
    let res = await getDetailStudentApi(_id);
    setSelectedStudent(res.data.data.data);
    setIsOpenDetail(!isOpenDetail);
  };
  const handleOpenUpdateStudent = async (_id) => {
    let res = await getDetailStudentApi(_id);
    setSelectedStudent(res.data.data.data);
    setSelectedStudentId(_id);
    setIsOpenUpdate(!isOpenUpdate);
  };

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

  //Yêu cầu cấp văn bằng
  const handleRequestDiploma = async () => {
    try{
      if(fileContent === ""){
        message.error("Bạn cần nhập khóa bí mật để xác thực!");
        return;
      }else{
        let res = await getDetailPkiApi(userInfo._id);
        if (fileContent.replace(/\s/g, "") === res.data.data.privateKey.replace(/\s/g, "")){
          let request = await createRegister("true", id);
          if (request.data.data.errcode === 0) {
            await createProgressApi(0, id);
            message.success("Yêu cầu đã được gửi. Vui lòng chờ phê duyệt!");
            await updateStudentRequestStatusApi(id, true);
            setOpen(false);
            fetchData();
          }
          if (request.data.data.errcode === 1) {
            message.error("Yêu cầu không thành công. Vui lòng thử lại!");
          }
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
      title: "Trạng thái",
      width: 160,
      align: "center",
      render: (text, record) => {
        const isApproved = record.approvals[2];
        return isApproved ? (
          <Button style={{ color: "#00CC99", border: "#00CC99 1px solid" }}>
            Đã phê duyệt
          </Button>
        ) : record.isRequested ? (
          <Button style={{ color: "#70700b", border: "#CCCC00 1px solid" }}>
            Đang chờ phê duyệt
          </Button>
        ) : (
          <Button danger>
            Yêu cầu phê duyệt
          </Button>
        );
      },
    },    
    {
      title: "Khoa",
      dataIndex: "khoa",
      width: 150,
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
        <Flex gap='small'>
          <Button
            title='Cập nhật thông tin sinh viên'
            style={{
              backgroundColor: "#00CC99",
              color: "#fff",
              width: "25px",
            }}
            onClick={() => handleOpenUpdateStudent(record.key)}>
            <a>
              <FormOutlined />
            </a>
          </Button>
          <Button
            title='Xem thông tin sinh viên'
            style={{
              backgroundColor: "#CCCC00",
              color: "#fff",
              width: "25px",
            }}
            onClick={() => handleOpenDetailStudent(record.key)}>
            <a>
              <InfoCircleOutlined />
            </a>
          </Button>
          <Button
            title='Yêu cầu'
            type='primary'
            style={{
              width: "25px",
              color: record.isRequested ? "#fff" : "",
              backgroundColor: record.isRequested ? "red" : "",
            }}
            disabled={
              record.status === "Đang học" || record.isRequested === true
            }
            onClick={() => handleOpenModal(record.key)}>
            <a>
              <AuditOutlined />
            </a>
          </Button>
        </Flex>
      ),
    },
  ];

  const handleOpenCreateStudent = () => {
    setIsOpenCreate(!isOpenCreate);
  };

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
      setFilterStudent(dataSource); // Hiển thị toàn bộ danh sách nếu không có giá trị tìm kiếm
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
                    title: "Sinh viên",
                  },
                ]}
                style={{
                  margin: "16px 0",
                }}
              />
              <div className='manage'>
                <div className='d-flex justify-content-between'>
                  <Button
                    className='mb-3'
                    style={{ backgroundColor: "#00CC99", color: "#fff" }}
                    onClick={handleOpenCreateStudent}>
                    <PlusCircleOutlined style={{ marginRight: "5px" }} />
                    Thêm mới
                  </Button>
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
      <CreateStudentComponent
        open={isOpenCreate}
        setOpen={setIsOpenCreate}
        onStudentCreate={fetchData}
      />
      <DetailStudentComponent
        open={isOpenDetail}
        setOpen={setIsOpenDetail}
        student={selectedStudent}
        fetchData={fetchData}
      />
      <UpdateStudentComponent
        open={isOpenUpdate}
        setOpen={setIsOpenUpdate}
        onStudentUpdate={fetchData}
        _id={selectedStudentId}
        student={selectedStudent}
      />
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

export default StudentPage;
