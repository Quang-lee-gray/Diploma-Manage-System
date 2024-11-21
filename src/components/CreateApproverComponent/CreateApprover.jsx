import React, { useReducer } from "react";
import {
  Button,
  Input,
  Modal,
  notification,
  Form,
  Select,
  Segmented,
} from "antd";
import { createApproverApi } from "../../services/approverService.js";
import "./CreateApprover.scss";
const { Option } = Select;
// Reducer quản lý các state
const approverReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};
const CreateApproverComponent = ({ open, setOpen, onStudentCreate }) => {
  const [api, contextHolder] = notification.useNotification();

  // Sử dụng useReducer để quản lý tất cả các state
  const initialState = {
    approverId: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    falculty: "Công nghệ thông tin",
    position: "",
    gender: "true",
    isExist: "false",
    isApprove: "false"
  };

  const [state, dispatch] = useReducer(approverReducer, initialState);

  // Lấy giá trị từ input
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Xử lý tạo người phê duyệt
  const handleCreateApprover = async () => {
    let approver = await createApproverApi(
      state.approverId,
      state.fullName,
      state.phoneNumber,
      state.address,
      state.falculty,
      state.position,
      state.gender,
      state.isExist,
      state.isApprove
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
        onStudentCreate();
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
        <h5>Thêm mới người phê duyệt</h5>
        <Form
          className='mt-2 form-container'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          onFinish={handleCreateApprover}
          initialValues={state}
          style={{ maxWidth: 1500 }}>
          <Form.Item
            label='Mã người phê duyệt'
            name='approverId'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Input
              name='approverId'
              value={state.approverId}
              onChange={handleGetValue}
            />
          </Form.Item>

          <Form.Item
            label='Họ tên người phê duyệt'
            name='fullName'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Input
              name='fullName'
              value={state.fullName}
              onChange={handleGetValue}
            />
          </Form.Item>

          <Form.Item
            label='Điện thoại'
            name='phoneNumber'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Input
              name='phoneNumber'
              value={state.phoneNumber}
              onChange={handleGetValue}
            />
          </Form.Item>

          <Form.Item label='Địa chỉ' name='address'>
            <Input
              name='address'
              value={state.address}
              onChange={handleGetValue}
            />
          </Form.Item>
          <Form.Item
            label='Chức vụ'
            name='position'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Input
              name='position'
              value={state.position}
              onChange={handleGetValue}
            />
          </Form.Item>
          <Form.Item
            label='Giới tính'
            name='gender'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Segmented
              options={[
                { label: "Nam", value: "true" },
                { label: "Nữ", value: "false" },
              ]}
              value={state.gender}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "status", value })
              }
            />
          </Form.Item>
          <Form.Item
            label='Khoa'
            name='falculty'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Select
              value={state.falculty}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "falculty", value })
              }
              placeholder='Chọn khoa'
              style={{ width: "100%" }}>
              <Option value='Công nghệ thông tin'>Công nghệ thông tin</Option>
              <Option value='Công nghệ kỹ thuật'>Công nghệ kỹ thuật</Option>
              <Option value='Sư phạm tin'>Sư phạm tin</Option>
              <Option value='Ngôn ngữ anh'>Ngôn ngữ anh</Option>
              <Option value='Nông - Lâm - Ngư nghiệp'>
                Nông - Lâm - Ngư nghiệp
              </Option>
              <Option value='Sư phạm tiểu học'>Sư phạm tiểu học</Option>
              <Option value='Kinh tế - Quản trị kinh doanh'>
                Kinh tế - Quản trị kinh doanh
              </Option>
            </Select>
          </Form.Item>

          <div className='d-flex justify-content-center'>
            <Button
              color='danger'
              variant='outlined'
              onClick={() => setOpen(false)}
              style={{ marginRight: "10px" }}>
              Hủy bỏ
            </Button>
            <Button type='primary' htmlType='submit'>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default CreateApproverComponent;
