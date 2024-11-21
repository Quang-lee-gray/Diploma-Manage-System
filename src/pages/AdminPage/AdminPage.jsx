import React from "react";
import { Breadcrumb, Layout } from "antd";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
import DashboardComponent from "../../components/DashComponent/DashComponent";
import "./AdminPage.scss";

const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  return (
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
                  title: "Quản trị viên",
                },
                {
                  title: "Dashboard",
                },
              ]}
              style={{
                margin: "16px 0",
              }}
            />
            <div className='dashboard '>
              <DashboardComponent />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
