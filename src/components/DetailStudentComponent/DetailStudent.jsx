import React, { useState, useEffect } from "react";
import { message, Button, Modal } from "antd";
import { deleteStudentApi } from "../../services/studentService.js";
const DetailStudentComponent = ({ open, setOpen, student, fetchData }) => {
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
  const handleDeleteStudent = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa sinh viên này?",
      content: `Tài khoản: ${student.studentId}`,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          let del = await deleteStudentApi(student._id);
          if (del.data.data.errcode === 0) {
            message.success(del.data.data.errmsg);
            setOpen(false);
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
  return (
    <>
      <Modal
        className='mt-3'
        title={<p>Thông tin sinh viên</p>}
        footer={
          <div>
            <Button type='primary' onClick={showLoading}>
              Tải lại
            </Button>
            <Button
              danger
              style={{ marginLeft: "3px" }}
              type='primary'
              onClick={handleDeleteStudent}>
              Xóa
            </Button>
          </div>
        }
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}>
        <div>
          <p>Mã sinh viên: {student.studentId}</p>
          <p>Họ tên: {student.fullName}</p>
          <p>Địa chỉ: {student.address}</p>
          <p>Số CCCD: {student.CCCD}</p>
          <p>Dân tộc: {student.nation}</p>
          <p>Điện thoại: {student.phoneNumber}</p>
          <p>Ngày sinh: {student.dateOfBirth}</p>
          <p>
            Trạng thái học: {student.status === true ? "Hoàn thành" : "Đang học"}
          </p>
          <p>Danh mục: {student.category}</p>
          <p>Khoa: {student.academicField}</p>
          <p>Khóa học: {student.yearOfAdmission}</p>
          <p>
            Xếp loại:
            {student.rank === 0
              ? " Giỏi"
              : student.rank === 1
              ? " Khá"
              : student.rank === 2
              ? " Trung bình"
              : student.rank === 3
              ? " Yếu"
              : ""}
          </p>
        </div>
      </Modal>
    </>
  );
};
export default DetailStudentComponent;
