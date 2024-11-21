import React from "react";
import { Breadcrumb, Layout } from "antd";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";

const { Header, Sider, Content } = Layout;

const ApproverPage = () => {
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
              <h3
                style={{
                  color: "red",
                  fontFamily: "Lobster, sans-serif",
                  fontSize: "32px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}>
                Chào mừng bạn, chúc bạn 1 ngày làm việc tốt lành!
              </h3>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default ApproverPage;
