import React, { useState } from "react";
import { notification, Button, Modal, Form, Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ChangePasswordApi } from "../../services/authService.js";
import "./ChangePasswordComponent.scss";
const ChangePasswordComponent = ({ open, setOpen }) => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, msg, placement, description) => {
    api[type]({
      message: msg,
      description,
      placement,
    });
  };
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({
    msgOp: "",
    msgNp: "",
    msgCp: "",
  });

  //get data from cookie
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  let userInfo = JSON.parse(decodeURIComponent(getCookieValue("user")));

  //get data on change with name
  const handleRenderDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "oldPassword") {
      setOldPassword(value);
    }
    if (name === "newPassword") {
      setNewPassword(value);
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  //validate form
  const handleChangePassword = async () => {
    try {
      if (!oldPassword) {
        setMessage({
          msgOp: "Vui lòng nhập dữ liệu.",
        });
      } else if (!newPassword) {
        setMessage({
          msgNp: "Vui lòng nhập dữ liệu.",
        });
      } else if (!confirmPassword) {
        setMessage({
          msgCp: "Vui lòng nhập dữ liệu.",
        });
      }

      let res = await ChangePasswordApi(
        userInfo._id,
        oldPassword,
        newPassword,
        confirmPassword
      );

      switch (res.data.user.errcode) {
        case 0:
          openNotification(
            "success",
            "Thông báo",
            "topRight",
            res.data.user.errmsg
          );
          setOpen(false);
          break;

        case 1:
          openNotification(
            "warning",
            "Cảnh báo",
            "topRight",
            res.data.user.errmsg
          );
          break;

        case 2:
          setMessage({
            msgOp: res.data.user.errmsg,
          });
          break;

        case 3:
          openNotification(
            "warning",
            "Cảnh báo",
            "topRight",
            res.data.user.errmsg
          );
          break;

        case 4:
          setMessage({
            msgCp: res.data.user.errmsg,
          });
          break;

        case 5:
          openNotification("error", "Lỗi", "topRight", res.data.user.errmsg);
          break;

        default:
          console.error("Unknown error code:", res.data.user.errcode);
          break;
      }
    } catch (e) {
      setMessage({
        msgOp: e,
        msgNp: e,
        msgCp: e,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Modal
        className='mt-5'
        visible={open}
        footer={null}
        onCancel={() => {
          setOpen(false);
        }}>
        <h5>Đổi mật khẩu</h5>
        <Form className='form-login mt-5'>
          <Form.Item
            name='oldPassword'
            validateStatus={message.msgOp ? "error" : ""}
            help={message.msgOp}>
            {" "}
            <Input.Password
              value={oldPassword}
              onChange={handleRenderDataChange}
              name='oldPassword'
              placeholder='Mật khẩu cũ'
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              type={isShowPassword ? "text" : "password"}
            />
          </Form.Item>
          <Form.Item
            className='mt-3'
            name='newPassword'
            validateStatus={message.msgNp ? "error" : ""}
            help={message.msgNp}>
            <Input.Password
              name='newPassword'
              value={newPassword}
              onChange={handleRenderDataChange}
              placeholder='Mật khẩu mới'
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              type={isShowPassword ? "text" : "password"}
            />
          </Form.Item>
          <Form.Item
            className='mt-3'
            name='confirmPassword'
            validateStatus={message.msgCp ? "error" : ""}
            help={message.msgCp}>
            <Input.Password
              name='confirmPassword'
              value={newPassword}
              onChange={handleRenderDataChange}
              placeholder='Xác nhận mật khẩu'
              iconRender={(visible) =>
                visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
              }
              type={isShowPassword ? "text" : "password"}
            />
          </Form.Item>

          <Form.Item className='text-right mt-4 pt-2'>
            <Button
              type='primary'
              htmlType='submit'
              onClick={handleChangePassword}>
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ChangePasswordComponent;
