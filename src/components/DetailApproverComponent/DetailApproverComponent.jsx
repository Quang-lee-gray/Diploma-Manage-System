import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
const DetailApproverComponent = ({ open, setOpen, approver }) => {
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
        title={<p>Thông tin người phê duyệt</p>}
        footer={
          <Button type='primary' onClick={showLoading}>
            Tải lại
          </Button>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}>
        <div>
          <p>Mã người phê duyệt: {approver.approverId}</p>
          <p>Họ tên: {approver.fullName}</p>
          <p>Điện thoại: {approver.phoneNumber}</p>
          <p>Địa chỉ: {approver.address}</p>
          <p>Khoa: {approver.falculty}</p>
          <p>Chức vụ: {approver.position}</p>
          <p>Giới tính: {approver.gender}</p>
        </div>
      </Modal>
    </>
  );
};
export default DetailApproverComponent;
