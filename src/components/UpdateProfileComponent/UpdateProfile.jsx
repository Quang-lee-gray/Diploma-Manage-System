import React, { useReducer, useEffect } from "react";
import {
  Button,
  Modal,
  notification,
  Form,
} from "antd";
import {
  updateApproverApi,
} from "../../services/approverService.js";

// Reducer quản lý các state
const approverReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_ALL_FIELDS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const UpdateProfileComponent = ({
  open,
  setOpen,
  _id,
  approver,
}) => {
  const [api, contextHolder] = notification.useNotification();

  // Sử dụng useReducer để quản lý tất cả các state
  const initialState = {
    approverId: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    falculty: "",
    position: "",
    gender: "true",
  };

  const [state, dispatch] = useReducer(approverReducer, initialState);

  useEffect(() => {
    if (approver) {
      dispatch({
        type: "SET_ALL_FIELDS",
        payload: {
          approverId: approver.approverId || "",
          fullName: approver.fullName || "",
          phoneNumber: approver.phoneNumber || "",
          address: approver.address || "",
          falculty: approver.falculty || "",
          position: approver.position || "",
          gender: approver.gender || "true",
        },
      });
    }
  }, [approver]);

  // Lấy giá trị từ input
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Xử lý tạo sinh viên
  const handleUpdateApprover = async () => {
    let approver = await updateApproverApi(
      _id,
      state.approverId,
      state.fullName,
      state.phoneNumber,
      state.address,
      state.falculty,
      state.position,
      state.gender
    );
    if (approver) {
      const { errcode, errmsg } = approver.data.data;
      if (errcode === 0) {
        api.success({
          message: "Thành công",
          description: errmsg,
          placement: "topRight",
        });
        setOpen(false);
      }
      if (errcode === 1) {
        api.warning({
          message: "Thông báo",
          description: errmsg,
          placement: "topRight",
        });
      }
      if (errcode === 2) {
        api.error({
          message: "Thông báo",
          description: errmsg,
          placement: "topRight",
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        width={800}
        className='p-5'
        visible={open}
        footer={null}
        style={{ transform: "translateY(-15%)" }}
        onCancel={() => setOpen(false)}>
        <h5>Cập nhật thông tin</h5>
        <Form
          className='mt-2'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          style={{ maxWidth: 1000 }}>
          <div className='row g-2 mb-3'>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Họ tên người phê duyệt'
                  name='fullName'
                  value={state.fullName}
                  onChange={handleGetValue}
                />
                <label>Họ tên</label>
              </div>
            </div>
          </div>
          <div className='row g-2 mb-3'>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Số điện thoại'
                  name='phoneNumber'
                  value={state.phoneNumber}
                  onChange={handleGetValue}
                />
                <label>Điện thoại</label>
              </div>
            </div>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Địa chỉ'
                  name='address'
                  value={state.address}
                  onChange={handleGetValue}
                />
                <label>Địa chỉ</label>
              </div>
            </div>
            <div className='col-sm'>
              <div className='form-floating'>
                <select
                  className='form-select'
                  name='gender'
                  value={state.gender}
                  onChange={handleGetValue}>
                  <option value='true'>Nam</option>
                  <option value='false'>Nữ</option>
                </select>
                <label>Giới tính</label>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-center'>
            {" "}
            <Button
              color='danger'
              variant='outlined'
              onClick={() => setOpen(false)}
              style={{ marginRight: "10px" }}>
              Hủy bỏ
            </Button>
            <Button type='primary' onClick={handleUpdateApprover}>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateProfileComponent;
