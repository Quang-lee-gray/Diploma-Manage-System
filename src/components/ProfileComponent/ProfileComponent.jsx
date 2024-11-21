import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
const ProfileComponent = ({
  open,
  setOpen,
  username,
  email,
  phoneNumber,
  role,
  position,
  gender,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, [1500]);
    }
  }, [open]);
  const showLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
  return (
    <>
      <Modal
        className='mt-5'
        title={<p>Thông tin cá nhân</p>}
        footer={
          <Button type='primary' onClick={showLoading}>
            Tải lại
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}>
        <p>Tên đăng nhập: {username}</p>
        <p>Email: {email}</p>
        <p>Vai trò: {role === 0 ? "Quản trị viên" : "Người phê duyệt"}</p>
        {role === 1 ? <p>Số điện thoại: {phoneNumber}</p> : ""}
        {role === 1 ? <p>Chức vụ: {position}</p> : ""}
        {role === 1 ? <p>Giới tính: {gender === true ? "Nam" : "Nữ"}</p> : ""}
      </Modal>
    </>
  );
};
export default ProfileComponent;
