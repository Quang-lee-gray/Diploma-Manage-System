import React, { useState, useEffect } from "react";
import { message, Button, Table, Breadcrumb, Layout, Input } from "antd";
import {
  ReloadOutlined,
} from "@ant-design/icons";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import { getAllDiplomaApi } from "../../services/diplomaService.js";
import { createStyles } from "antd-style";
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
const DiplomaPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filterApprover, setFilterApprover] = useState(dataSource);
  const [searchVal, setSearchVal] = useState("");
  const styles = useStyle();
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      width: 60,
      align: "center",
    },
    {
      title: "Số hiệu văn bằng",
      dataIndex: "diplomaId",
      width: 120,
      align: "center",
    },
    {
      title: "Ngày cấp",
      dataIndex: "issueDate",
      width: 120,
      align: "center",
    },
    {
      title: "Loại bằng",
      dataIndex: "type",
      width: 100,
      align: "center",
    },
    {
      title: "Chuyên ngành",
      dataIndex: "specialize",
      width: 150,
      align: "center",
    },
    {
      title: "Loại hình đào tạo",
      dataIndex: "typeOfTraining",
      width: 150,
      align: "center",
    },
    {
      title: "Xếp loại",
      dataIndex: "rank",
      width: 100,
      align: "center",
    },
  ];

  const fetchData = async () => {
    try {
      let diploma = await getAllDiplomaApi();

      const diplomaData = diploma?.data?.data?.data;

      if (Array.isArray(diplomaData)) {
        const newDataSource = [];
        diplomaData.forEach((diploma, index) => {
          newDataSource.push({
            stt: index + 1,
            key: diploma._id,
            diplomaId: diploma.diplomaId,
            issueDate: diploma.issueDate,
            type: diploma.type,
            specialize: diploma.specialize,
            typeOfTraining: diploma.typeOfTraining,
            rank: diploma.rank,
          });
        });
        setDataSource(newDataSource);
        setFilterApprover(newDataSource);
      } else {
        message.error("Dữ liệu không phải là một mảng.", diplomaData);
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
        item.diplomaId &&
        item.diplomaId.toLowerCase().includes(searchVal.toLowerCase())
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
                    title: "Văn bằng",
                  },
                ]}
                style={{
                  margin: "16px 0",
                }}
              />
              <div className='manage'>
                <div className='d-flex justify-content-end mb-3'>
                  <Search
                    style={{ width: "320px", marginRight: "10px" }}
                    placeholder='Nhập số hiệu văn bằng để lọc văn bằng'
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
    </>
  );
};

export default DiplomaPage;
