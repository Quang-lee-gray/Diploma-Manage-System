import React, { useState, useEffect } from "react";
import {
  message,
  Modal,
  Button,
  Flex,
  Table,
  Breadcrumb,
  Layout,
  Input,
} from "antd";
import {
  PlusCircleOutlined,
  InfoCircleOutlined,
  ClearOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { createStyles } from "antd-style";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import DetailAccountComponent from "../../components/DetailAccountComponent/DetailAccount.jsx";
import CreateAccountComponent from "../../components/CreateAccountComponent/CreateAccount.jsx";
import {
  getAllUserApi,
  getDetailUserApi,
  deleteUserApi,
} from "../../services/userService.js";
import { getAllApproverApi } from "../../services/approverService.js";
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

const AccountPage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [selectedApprover, setSelectedApprover] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(dataSource);

  const { styles } = useStyle();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleOpenDetailAccount = async (_id) => {
    let user = await getDetailUserApi(_id);
    setSelectedAccount(user.data.data.user);
    setIsOpenDetail(!isOpenDetail);
  };

  const handleDeleteAccount = (record) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa tài khoản này?",
      content: `Tài khoản: ${record.username}`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          let del = await deleteUserApi(record.key);
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
      title: "Tài khoản",
      dataIndex: "username",
      width: 100,
      align: "center",
    },
    {
      title: "email",
      dataIndex: "email",
      width: 100,
      align: "center",
    },
    {
      title: "Quyền",
      dataIndex: "role",
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
            title='Xóa tài khoản'
            danger
            type='primary'
            style={{ marginRight: "10px" }}
            onClick={() => handleDeleteAccount(record)}>
            <a>
              <ClearOutlined />
            </a>
          </Button>
          <Button
            title='Xem thông tin tài khoản'
            style={{ backgroundColor: "#CCCC00", color: "#fff" }}
            onClick={() => handleOpenDetailAccount(record.key)}>
            <a>
              <InfoCircleOutlined />
            </a>
          </Button>
        </Flex>
      ),
    },
  ];

  const handleOpenCreateUser = async () => {
    let approver = await getAllApproverApi();
    setSelectedApprover(approver.data.data.data);
    setIsOpenCreate(!isOpenCreate);
  };

  const fetchData = async () => {
    try {
      let user = await getAllUserApi();

      const account = user.data.data;

      if (Array.isArray(account)) {
        const newDataSource = [];
        account.forEach((user, index) => {
          newDataSource.push({
            stt: index + 1,
            key: user._id,
            username: user.username,
            email: user.email,
            role: user.role === 0 ? "Quản trị viên" : "Người phê duyệt",
          });
        });
        setDataSource(newDataSource);
        setFilter(newDataSource);
      } else {
        message.error("Dữ liệu không phải là một mảng:", account);
      }
    } catch (err) {
      message.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchClick = () => {
    if (search === "") {
      setFilter(dataSource);
      return;
    }
    const filterSearch = dataSource.filter((item) => {
      return (
        item.username.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilter(filterSearch);
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
                    title: "Tài khoản",
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
                    onClick={handleOpenCreateUser}>
                    <PlusCircleOutlined style={{ marginRight: "5px" }} />
                    Thêm mới
                  </Button>

                  <div className='d-flex justify-content-end mb-3'>
                    <Search
                      style={{ width: "350px", marginRight: "10px" }}
                      placeholder='Nhập tên tài khoản hoặc email để tìm kiếm'
                      enterButton
                      onChange={(e) => setSearch(e.target.value)}
                      onSearch={handleSearchClick}
                    />
                    <Button
                      style={{ backgroundColor: "#00CC99", color: "#fff" }}
                      onClick={fetchData}>
                      <ReloadOutlined style={{ marginRight: "5px" }} />
                      Tải lại
                    </Button>
                  </div>
                </div>
                <Table
                  className={styles.customTable}
                  columns={columns}
                  bordered
                  dataSource={filter}
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
      <DetailAccountComponent
        open={isOpenDetail}
        setOpen={setIsOpenDetail}
        user={selectedAccount}
      />
      <CreateAccountComponent
        open={isOpenCreate}
        setOpen={setIsOpenCreate}
        onUserCreate={fetchData}
        approvers={selectedApprover}
      />
    </>
  );
};

export default AccountPage;
