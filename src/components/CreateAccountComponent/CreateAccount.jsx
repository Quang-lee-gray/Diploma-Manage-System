import React, { useReducer, useEffect } from "react";
import { Button, Input, Modal, notification, Form, Select } from "antd";
import { createUserApi } from "../../services/userService.js";
import { updateIsExistApi } from "../../services/approverService.js";

const CreateAccountComponent = ({ open, setOpen, onUserCreate, approvers }) => {
  const [api, contextHolder] = notification.useNotification();

  const initialState = {
    username: "",
    password: "",
    email: "",
    role: "1",
    approver: "",
    isSignature:"false"
  };

  const userReducer = (state, action) => {
    switch (action.type) {
      case "SET_FIELD":
        return { ...state, [action.field]: action.value };
      case "RESET_FORM":
        return initialState;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const handleGetValue = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleCreateAccount = async () => {
    let user = await createUserApi(
      state.username,
      state.password,
      state.email,
      state.role,
      state.approver,
      state.isSignature
    );
    if (user) {
      const { errcode } = user.data.data;
      if (errcode === 0) {
        await updateIsExistApi(state.approver, true);
        api.success({
          message: "Thành công",
          description: "Cấp tài khoản thành công.",
          placement: "topRight",
        });
        dispatch({ type: "RESET_FORM" });
        setOpen(false);
        onUserCreate();
      }
      if (errcode === 1) {
        api.warning({
          message: "Thông báo",
          description: "Có lỗi xảy ra. Vui lòng thử lại!",
          placement: "topRight",
        });
        return;
      }
    }
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  useEffect(() => {
    if (open) resetForm(); // Reset form mỗi khi mở
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    resetForm(); // Reset form khi đóng
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
        onCancel={closeModal}>
        <h5>Cấp tài khoản</h5>
        <Form
          className='mt-2 form-container'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          initialValues={state}
          onFinish={handleCreateAccount}
          style={{ maxWidth: 1500 }}>
          <Form.Item
            label='Tên đăng nhập'
            name='username'
            rules={[
              { required: true, message: "Vui lòng nhập tên đăng nhập" },
            ]}>
            <Input
              placeholder='Tên đăng nhập'
              name='username'
              value={state.username}
              onChange={handleGetValue}
            />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}>
            <Input.Password
              placeholder='Mật khẩu'
              name='password'
              value={state.password}
              onChange={handleGetValue}
            />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                type: "email",
                message: "Vui lòng nhập email hợp lệ",
              },
            ]}>
            <Input
              placeholder='Email'
              name='email'
              value={state.email}
              onChange={handleGetValue}
            />
          </Form.Item>

          <Form.Item label='Quyền hạn'>
            <Input disabled value='Người phê duyệt' />
          </Form.Item>

          <Form.Item
            label='Tài khoản được cấp'
            name='approver'
            rules={[
              { required: true, message: "Vui lòng chọn tài khoản được cấp" },
            ]}>
            <Select
              placeholder='Chọn tài khoản được cấp'
              name='approver'
              value={state.approver}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "approver", value })
              }>
              {approvers.map((item) =>
                !item.isExist ? (
                  <Select.Option key={item._id} value={item._id}>
                    {item.fullName}
                  </Select.Option>
                ) : null
              )}
            </Select>
          </Form.Item>

          <div className='d-flex justify-content-center'>
            <Button danger onClick={closeModal} style={{ marginRight: "10px" }}>
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

export default CreateAccountComponent;
