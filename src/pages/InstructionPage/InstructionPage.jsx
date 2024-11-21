import React from "react";
import { Layout, Typography, Card } from "antd";
import MenuComponent from "../../components/MenuComponent/MenuComponent";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent.jsx";
const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;

const InstructionPage = () => (
  <Layout style={{ minHeight: "100vh" }}>
    {/* Header */}
    <Header style={{ background: "#fff", padding: 0, margin: 0 }}>
      <HeaderComponent />
    </Header>

    <Layout>
      <Sider width={0} style={{ background: "#fff" }} />
      <MenuComponent />

      {/* Main content */}
      <Content style={{ padding: "24px" }}>
        <Card className='mb-4'>
          <Title level={4}>1. Đăng Nhập Hệ Thống</Title>
          <Text>
            - Truy cập vào trang đăng nhập.
            <br />
            - Nhập tài khoản và mật khẩu của bạn.
            <br />- Nhấn nút <Text strong>“Đăng nhập”</Text> để vào hệ thống.
          </Text>
        </Card>

        <Card className='mb-4'>
          <Title level={4}>2. Quản Lý Thông Tin Sinh Viên</Title>
          <Text>
            - Chọn <Text strong>“Danh sách sinh viên”</Text> từ thanh điều
            hướng.
            <br />
            - Tìm kiếm sinh viên theo tên hoặc mã số.
            <br />- Nhấn <Text strong>“Xem chi tiết”</Text> để xem thông tin chi
            tiết và phê duyệt văn bằng.
          </Text>
        </Card>

        <Card className='mb-4'>
          <Title level={4}>3. Phê Duyệt Văn Bằng</Title>
          <Text>
            - Vào trang chi tiết của sinh viên.
            <br />- Nhấn <Text strong>“Phê duyệt”</Text> để mở modal phê duyệt.
            <br />- Kiểm tra và xác nhận thông tin trước khi nhấn{" "}
            <Text strong>“Xác nhận”</Text>.
          </Text>
        </Card>

        <Card className='mb-4'>
          <Title level={4}>4. Quản Lý Tài Khoản</Title>
          <Text>
            - Truy cập <Text strong>“Quản lý tài khoản”</Text> từ menu tài khoản
            ở góc trên.
            <br />- Cập nhật thông tin cá nhân và thay đổi mật khẩu khi cần.
          </Text>
        </Card>

        <Card className='mb-4'>
          <Title level={4}>5. Đăng Xuất</Title>
          <Text>
            - Nhấn vào <Text strong>“Đăng xuất”</Text> ở menu trên bên phải để
            thoát khỏi hệ thống.
          </Text>
        </Card>
      </Content>

      {/* Footer */}
      <Footer className='text-center'>
        <Text>© 2024 Hệ Thống Quản Lý Văn Bằng Đại Học</Text>
      </Footer>
    </Layout>
  </Layout>
);

export default InstructionPage;
