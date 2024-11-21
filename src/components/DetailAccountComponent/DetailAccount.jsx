import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
const DetailAccountComponent = ({ open, setOpen, user }) => {
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
        title={<p>Thông tin tài khoản</p>}
        footer={
          <Button type='primary' onClick={showLoading}>
            Tải lại
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}>
        <div>
          <p>Tên đăng nhập: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>
            Quyền hạn: {user.role === 0 ? "Quản trị viên" : "Người phê duyệt"}
          </p>
        </div>
      </Modal>
    </>
  );
};
export default DetailAccountComponent;
