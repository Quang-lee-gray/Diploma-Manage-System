import React, { useState, useEffect } from "react";
import {
  Modal,
  message,
  Button,
  Flex,
  Table,
  Breadcrumb,
  Layout,
  Input,
} from "antd";
import {
  FormOutlined,
  AlertOutlined,
  PlusCircleOutlined,
  InfoCircleOutlined,
  ClearOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import {
  getAllApproverApi,
  getDetailApproverApi,
  deleteApproverApi,
} from "../../services/approverService.js";
import CreateApproverComponent from "../../components/CreateApproverComponent/CreateApprover.jsx";
import DetailApproverComponent from "../../components/DetailApproverComponent/DetailApproverComponent";
import UpdateApproverComponent from "../../components/UpdateApproverComponent/UpdateApprover.jsx";
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

const ManageApproverPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [selectedApprover, setSelectedApprover] = useState({});
  const [selectedApproverId, setSelectedApproverId] = useState("");
  const [filterApprover, setFilterApprover] = useState(dataSource);
  const [searchVal, setSearchVal] = useState("");

  const { styles } = useStyle();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleOpenDetailApprover = async (_id) => {
    let res = await getDetailApproverApi(_id);
    setSelectedApprover(res.data.data.data);
    setIsOpenDetail(!isOpenDetail);
  };
  const handleOpenUpdateApprover = async (_id) => {
    let res = await getDetailApproverApi(_id);
    setSelectedApprover(res.data.data.data);
    setSelectedApproverId(_id);
    setIsOpenUpdate(!isOpenUpdate);
  };
  const handleDeleteApprover = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn người phê duyệt này?",
      content: `Mã người phê duyệt: ${record.approverId}`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          let del = await deleteApproverApi(record.key);
          if (del.data.data.errcode === 0) {
            message.success(del.data.data.errmsg);
            fetchData();
          }
          if (del.data.data.errcode === 1) {
            message.success(del.data.data.errmsg);
          }
        } catch (error) {
          message.error(error);
        }
      },
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 60,
      align: "center",
    },
    {
      title: "Mã người phê duyệt",
      dataIndex: "approverId",
      width: 100,
      align: "center",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      width: 120,
      align: "center",
    },
    {
      title: "Điện thoại",
      dataIndex: "dt",
      width: 100,
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: 150,
      align: "center",
    },
    {
      title: "Khoa",
      dataIndex: "khoa",
      width: 150,
      align: "center",
    },
    {
      title: "Chức vụ",
      dataIndex: "position",
      width: 100,
      align: "center",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      width: 100,
      align: "center",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      align: "center",
      render: (record) => (
        <Flex className='d-flex justify-content-center'>
          <Button
            title='Cập nhật thông tin người phê duyệt'
            style={{
              backgroundColor: "#00CC99",
              color: "#fff",
              marginRight: "5px",
              width: "25px",
            }}
            onClick={() => handleOpenUpdateApprover(record.key)}>
            <a>
              <FormOutlined />
            </a>
          </Button>
          <Button
            title='Xem thông tin người phê duyệt'
            style={{
              backgroundColor: "#CCCC00",
              color: "#fff",
              marginRight: "5px",
              width: "25px",
            }}
            onClick={() => handleOpenDetailApprover(record.key)}>
            <a>
              <InfoCircleOutlined />
            </a>
          </Button>
          <Button
            title='Xóa'
            danger
            type='primary'
            style={{ width: "25px" }}
            onClick={() => handleDeleteApprover(record)}>
            <a>
              <ClearOutlined />
            </a>
          </Button>
        </Flex>
      ),
    },
  ];

  const handleOpenCreateApprover = () => {
    setIsOpenCreate(!isOpenCreate);
  };

  const fetchData = async () => {
    try {
      let approver = await getAllApproverApi();

      const approverData = approver.data.data.data;

      if (Array.isArray(approverData)) {
        const newDataSource = [];
        approverData.forEach((approver, index) => {
          newDataSource.push({
            key: approver._id,
            stt: index + 1,
            approverId: approver.approverId,
            name: approver.fullName,
            dt: approver.phoneNumber,
            address: approver.address,
            khoa: approver.falculty,
            position: approver.position,
            gender: approver.gender === false ? "Nữ" : "Nam",
          });
        });
        setDataSource(newDataSource);
        setFilterApprover(newDataSource);
      } else {
        message.error(
          "Dữ liệu người phê duyệt không phải là một mảng:",
          approverData
        );
      }
    } catch (err) {
      message.error(err);
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
      setFilterApprover(dataSource);
      return;
    }
    const findBySearch = dataSource.filter((item) => {
      return (
        (item.approverId &&
          item.approverId.toLowerCase().includes(searchVal.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(searchVal.toLowerCase()))
      );
    });
    setFilterApprover(findBySearch);
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
                    title: "Người phê duyệt",
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
                    onClick={handleOpenCreateApprover}>
                    <PlusCircleOutlined style={{ marginRight: "5px" }} />
                    Thêm mới
                  </Button>
                  <div>
                    <Search
                      style={{ width: "300px", marginRight: "10px" }}
                      placeholder='Tìm kiếm người phê duyệt'
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
                  bordered
                  dataSource={filterApprover}
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
      <CreateApproverComponent
        open={isOpenCreate}
        setOpen={setIsOpenCreate}
        onStudentCreate={fetchData}
      />
      <DetailApproverComponent
        open={isOpenDetail}
        setOpen={setIsOpenDetail}
        approver={selectedApprover}
      />
      <UpdateApproverComponent
        open={isOpenUpdate}
        setOpen={setIsOpenUpdate}
        onApproverUpdate={fetchData}
        _id={selectedApproverId}
        approver={selectedApprover}
      />
    </>
  );
};

export default ManageApproverPage;
