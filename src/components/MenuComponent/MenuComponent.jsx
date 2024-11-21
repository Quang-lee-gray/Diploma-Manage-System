import React, { useState } from "react";
import { Menu, Button } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import {
  BarChartOutlined,
  GlobalOutlined,
  ExclamationCircleOutlined,
  AuditOutlined,
  IdcardOutlined,
  AliwangwangOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckSquareOutlined,
  FileProtectOutlined,
  ContainerOutlined 
} from "@ant-design/icons";

const MenuComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook để lấy đường dẫn hiện tại

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // Chuyển trang
  const handleChangePage = (url) => {
    navigate(url);
  };

  // Đặt key mặc định dựa vào đường dẫn hiện tại
  const selectedKey = () => {
    if (location.pathname.includes("/system/admin/student")) return "2";
    if (location.pathname.includes("/system/admin/approver")) return "3";
    if (location.pathname.includes("/system/admin/diploma")) return "4";
    if (location.pathname.includes("/system/admin/account")) return "5";
    if (location.pathname.includes("/nguoi-phe-duyet/danh-sach")) return "7";
    if (location.pathname.includes("/system/admin")) return "1";
    return "6";
  };

  //get cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  let userInfo = JSON.parse(decodeURIComponent(getCookieValue("user")));

  return (
    <>
      <div className='body mt-3'>
        <div
          style={{
            width: 256,
          }}>
          <Button
            onClick={toggleCollapsed}
            style={{
              marginBottom: 15,
            }}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            selectedKeys={[selectedKey()]}
            defaultOpenKeys={["sub1"]}
            mode='inline'
            theme='light'
            inlineCollapsed={collapsed}>
            {/* Menu Item */}
            {userInfo.role === 0 ? (
              <Menu.Item
                key='1'
                icon={<BarChartOutlined />}
                onClick={() => handleChangePage("/system/admin")}>
                Dashboard
              </Menu.Item>
            ) : null}

            {/* SubMenu */}
            <Menu.SubMenu
              key='sub1'
              icon={<GlobalOutlined />}
              title={
                userInfo.role === 0 ? "Quản lý hệ thống" : "Phê duyệt văn bằng"
              }>
              {userInfo.role === 0 ? (
                <Menu.Item
                  key='2'
                  icon={<AliwangwangOutlined />}
                  onClick={() => handleChangePage("/system/admin/student")}>
                  Danh sách sinh viên
                </Menu.Item>
              ) : null}
              {userInfo.role === 0 ? (
                <Menu.Item
                  key='3'
                  icon={<AuditOutlined />}
                  onClick={() => handleChangePage("/system/admin/approver")}>
                  Người phê duyệt
                </Menu.Item>
              ) : null}
              {userInfo.role === 0 ? (
                <Menu.Item
                  key='4'
                  icon={<IdcardOutlined />}
                  onClick={() => handleChangePage("/system/admin/diploma")}>
                  Danh sách văn bằng
                </Menu.Item>
              ) : null}
              {userInfo.role === 0 ? (
                <Menu.Item
                  key='5'
                  icon={<CheckSquareOutlined />}
                  onClick={() => handleChangePage("/system/admin/account")}>
                  Quản lý tài khoản
                </Menu.Item>
              ) : (
                <Menu.Item
                  key='6'
                  icon={<FileProtectOutlined />}
                  onClick={() =>
                    handleChangePage("/nguoi-phe-duyet/danh-sach")
                  }>
                  Danh sách
                </Menu.Item>
              )}
              {userInfo.role === 0 ? (
                <Menu.Item
                  key='7'
                  icon={<ContainerOutlined />}
                  onClick={() => handleChangePage("/system/admin/reissued")}>
                  Cấp lại văn bằng
                </Menu.Item>
              ) : null}
              {userInfo.role === 0 ? ( null
              ) : 
              <Menu.Item
                key='8'
                icon={<ContainerOutlined />}
                onClick={() => handleChangePage("/nguoi-phe-duyet/cap-lai/")}>
                Cấp lại văn bằng
              </Menu.Item>}
            </Menu.SubMenu>
            {userInfo.role === 0 ? (
              <Menu.Item
                key='9'
                icon={<ExclamationCircleOutlined />}
                onClick={() => handleChangePage("/system/instruction")}>
                Hướng dẫn sử dụng
              </Menu.Item>
            ) : (
              <Menu.Item
                key='10'
                icon={<ExclamationCircleOutlined />}
                onClick={() => handleChangePage("/nguoi-phe-duyet/instruction/")}>
                Hướng dẫn sử dụng
              </Menu.Item>
              )
            }
          </Menu>
        </div>
      </div>
    </>
  );
};

export default MenuComponent;
