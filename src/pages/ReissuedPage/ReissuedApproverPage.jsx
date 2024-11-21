import React, { useEffect, useState } from "react";
import {
  message,
  Button,
  Flex,
  Table,
  Breadcrumb,
  Layout,
  Input,
  Modal,
  Upload
} from "antd";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { useLocation } from "react-router-dom";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import { getDetailPkiApi } from "../../services/certificateService.js";
import { createDiplomaApi } from "../../services/diplomaService.js";
import {
  getAllStudentApi,
  updateStudentCheckedApi,
} from "../../services/studentService.js";

const { Header, Sider, Content } = Layout;
const { Search } = Input;
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

const ListPage = () => {
  const { styles } = useStyle();
  const [dataSource, setDataSource] = useState([]);
  const [filterStudent, setFilterStudent] = useState(dataSource);
  const [searchVal, setSearchVal] = useState("");
  const [open, setOpen] = useState(false);
  const [dataApproved, setDataApproved] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [id, setId] = useState({});

  const location = useLocation();
  const student = location.state?.student || {};

  // Get cookie by name
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

  const handleReissued = async () => {
    try {
    let res = await getDetailPkiApi(userInfo._id);

    // Kiểm tra khóa bí mật từ file upload với khóa bí mật trong cơ sở dữ liệu
    if (fileContent.replace(/\s/g, "") === res.data.data.privateKey.replace(/\s/g, "")) {
      await updateStudentCheckedApi(id, true);
      // Cập nhật tình trạng phê duyệt
      message.success("Phê duyệt văn bằng thành công.");
      setOpen(false);
      fetchData();
    } else {
      message.error("Khóa bí mật không chính xác!");
    }
    } catch (error) {
      message.error(error);
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
      title: "Tiến trình học",
      dataIndex: "status",
      width: 127,
      align: "center",
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
            {record.isChecked ? "Đã cấp lại" : 
            (
            <Button
            title='Phê duyệt'
            style={{
              width: "25px",
              color: record.isReissued ? "#fff" : "",
              backgroundColor: record.isReissued ? "#CCCC00" : "red",
              transform: "translateX(50%)",
            }}
            disabled={
              record.isReissued === false 
            }
            onClick={() => handleOpenModal(record.key)}>
            <a>
              <EditOutlined />
            </a>
          </Button>
            )}
        </Flex>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      const student = await getAllStudentApi();
      const studentData = student?.data?.student?.data || [];

      const newDataSource = studentData
      .filter(student => 
        student.academicField === userInfo.approver.falculty &&
        student.isChecked === false && student.isReissued 
      )
        .map((student, index) => ({
          key: student._id,
          stt: index + 1,
          masv: student.studentId,  
          name: student.fullName,
          address: student.address,
          dt: student.phoneNumber,
          ns: student.dateOfBirth,
          cccd: student.CCCD,
          status: student.status ? "Đã hoàn thành" : "Đang học",
          khoa: student.academicField,
          year: student.yearOfAdmission,
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
          img: student.image,
          isRequested: student.isRequested,
          isReissued: student.isReissued,
          isChecked: student.isChecked,
          approvals: student.approvals
        }));

        const newDataApproved = studentData
        .filter(student => 
          student.academicField === userInfo.approver.falculty &&
          student.isChecked
        )
          .map((student, index) => ({
            key: student._id,
            stt: index + 1,
            masv: student.studentId,
            name: student.fullName,
            address: student.address,
            dt: student.phoneNumber,
            ns: student.dateOfBirth,
            cccd: student.CCCD,
            status: student.status ? "Đã hoàn thành" : "Đang học",
            khoa: student.academicField,
            year: student.yearOfAdmission,
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
            img: student.image,
            isRequested: student.isRequested,
            isReissued: student.isReissued,
            isChecked: student.isChecked,
            approvals: student.approvals
          }));

      setDataSource(newDataSource);
      setDataApproved(newDataApproved);
      setFilterStudent(newDataSource);
    } catch (err) {
      message.error("Không thể tải danh sách sinh viên.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleReloadData = async () => {
    await fetchData();
  };
  const handleSearchClick = () => {
    if (searchVal === "") {
      setFilterStudent(dataSource);
      return;
    }
    const findBySearch = dataSource.filter((item) => {
      return (
        (item.masv &&
          item.masv.toLowerCase().includes(searchVal.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(searchVal.toLowerCase()))
      );
    });
    setFilterStudent(findBySearch);
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
                margin: 0,
                padding: 24,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}>
              <Breadcrumb
                items={[
                  {
                    title: "Người phê duyệt",
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
                <div className='d-flex justify-content-end m-3'>
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
                <div>
                  <p className="mt-3" style={{marginBottom: "15px"}}><b> Danh sách sinh viên đã phê duyệt </b></p>
                  <Table
                    className={styles.customTable}
                    columns={columns}
                    dataSource={dataApproved}
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
          <Button type="primary" key="verify" onClick={handleReissued}>
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

export default ListPage;
