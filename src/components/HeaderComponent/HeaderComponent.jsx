import React, { useState } from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, BellOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "../ProfileComponent/ProfileComponent";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import UpdateProfileComponent from "../UpdateProfileComponent/UpdateProfile.jsx";
import VerifyComponent from "../VerifyComponent/VerifyComponent.jsx";
import { logoutApi } from "../../services/authService.js";
import "./HeaderComponent.scss";

const HeaderComponent = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const navigate = useNavigate();

  //delete xookie by name
  const del_cookie = (name) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  //get cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  let userInfo = JSON.parse(decodeURIComponent(getCookieValue("user")));
  let userLabel =
    userInfo.role === 0
      ? "Admin"
      : `${userInfo.approver.fullName} ( ${userInfo.approver.position} )`;
  let icon = (
    <Avatar
      style={{
        backgroundColor: "#237eff",
        color: "#fff",
      }}
      icon={<UserOutlined />}
    />
  );

  //Xử lý đóng mở menu
  const handleOnOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const handleProfileUser = () => {
    setIsOpenProfile(!isOpenProfile);
    setIsOpenChangePass(false);
    setIsOpenUpdate(false);
  };

  const handleUpdateProfile = async () => {
    setIsOpenUpdate(!isOpenUpdate);
    setIsOpenChangePass(false);
    setIsOpenProfile(false);
  };

  const handleChangePassword = () => {
    setIsOpenChangePass(!isOpenChangePass);
    setIsOpenProfile(false);
    setIsOpenUpdate(false);
  };

  const handleVerifyComponent = () => {
    setIsOpenVerify(!isOpenVerify);
    setIsOpenProfile(false);
    setIsOpenChangePass(false);
    setIsOpenUpdate(false);
  };


  const handleLogout = async () => {
    let logout = await logoutApi();
    if (logout) {
      del_cookie("user");
      del_cookie("accessToken");
      navigate("/dang-nhap");
    } else {
    }
  };
  return (
    <>
      <div className='heading row'>
        <div className='logo col-5'>
          <a href='/system/admin'>
            <img
              className='mb-3'
              src='https://media.hdu.edu.vn/Media/2_SV_HDU/Images/logo-hdu-5204169fda-7.png'
              alt='logo'
            />
          </a>
        </div>
        <div className='col-4'></div>
        <div className='profile col-3'>
          <Menu
            style={{ width: "253" }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["menu"]}
            openKeys={openKeys}
            theme='light'
            onOpenChange={handleOnOpenChange}
            mode='inline'>
            <Menu.SubMenu
              key='menu'
              title={<span style={{ color: "#000" }}>{userLabel}</span>}
              icon={icon}>
              <Menu.Item key='1' onClick={handleProfileUser}>
                Thông tin cá nhân
              </Menu.Item>
              {userInfo.role === 0 ? ( null ) : (
                <Menu.Item key='2' onClick={handleUpdateProfile}>
                  Cập nhật thông tin cá nhân
                </Menu.Item>
              )}
              <Menu.Item key='3' onClick={handleChangePassword}>
                Đổi mật khẩu
              </Menu.Item>
              <Menu.Item key='4' onClick={handleVerifyComponent}>Tạo chữ ký số</Menu.Item>
              <Menu.Item key='5' onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </div>
      </div>
      {userInfo.role === 0 ? (
        <ProfileComponent
          open={isOpenProfile}
          setOpen={setIsOpenProfile}
          username={userInfo.username}
          email={userInfo.email}
          role={userInfo.role}
        />
      ) : (
        <ProfileComponent
          open={isOpenProfile}
          setOpen={setIsOpenProfile}
          username={userInfo.username}
          email={userInfo.email}
          role={userInfo.role}
          phoneNumber={userInfo.approver.phoneNumber}
          position={userInfo.approver.position}
          gender={userInfo.approver.gender}
        />
      )}
      <ChangePasswordComponent
        open={isOpenChangePass}
        setOpen={setIsOpenChangePass}
      />
      {userInfo.role === 0 ? ( null) : ( 
       <UpdateProfileComponent
        open={isOpenUpdate}
        setOpen={setIsOpenUpdate}
        _id={userInfo.approver._id}
        approver={userInfo.approver}
       /> 
      )}
      <VerifyComponent 
        open={isOpenVerify}
        setOpen={setIsOpenVerify}
        id={userInfo._id}
        passw={userInfo.password}
      />
    </>
  );
};

export default HeaderComponent;
