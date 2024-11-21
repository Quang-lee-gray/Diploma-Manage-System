import { React, useState, Fragment } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { notification, Form, Input, Carousel } from "antd";
import { loginApi } from "../../services/authService.js";
const LoginPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, msg, placement, description) => {
    api[type]({
      message: msg,
      description,
      placement,
    });
  };

  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    msgUn: "",
    msgPw: "",
  });

  //show password
  const handleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  //get data on change with name
  const handleRenderDataChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    try {
      if (!username) {
        openNotification(
          "warning",
          "Đăng nhập thất bại",
          "topRight",
          "Vui lòng nhập dữ liệu!"
        );
        return;
      }
      if (!password) {
        openNotification(
          "warning",
          "Đăng nhập thất bại",
          "topRight",
          "Vui lòng nhập dữ liệu!"
        );
        return;
      }
      if (username) {
        setMessage({
          msgUn: "",
        });
      }
      if (password) {
        setMessage({
          msgPw: "",
        });
      }

      let res = await loginApi(username, password);
      if (res.data.user.errcode === 0) {
        setMessage({ msgUn: "", msgPw: "" });
        let accessToken = res.data.user.accessToken;
        let role = res.data.user.user.role;

        //Lưu vào cookie
        document.cookie = `accessToken=${accessToken}; path=/; max-age=18000; Secure`;
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(res.data.user.user)
        )}; path=/; max-age=18000; Secure`;
        //Check accessToken
        if (accessToken) {
          if (role === 0) {
            navigate("/system/admin");
          } else {
            navigate("/nguoi-phe-duyet");
          }
        } else {
          navigate("/dang-nhap");
        }
        return;
      }

      if (res.data.user.errcode === 1) {
        setMessage({
          msgUn: "",
          msgPw: res.data.user.errmsg,
        });
        openNotification(
          "warning",
          "Đăng nhập thất bại",
          "topRight",
          res.data.user.errmsg
        );
      }
      if (res.data.user.errcode === 2) {
        openNotification(
          "warning",
          "Đăng nhập thất bại",
          "topRight",
          res.data.user.errmsg
        );
      }
    } catch (error) {
      setMessage({
        msgUn: "",
        msgPw: "",
      });
      openNotification("error", "Lỗi hệ thống", "topRight", error.message);
    }
  };
  return (
    <>
      {contextHolder}
      <div className='login-page'>
        <div className='header pt-2 pb-2 col-12'>
          <img
            src='https://media.hdu.edu.vn/Media/2_SV_HDU/Images/logo-congsinhvien6b33a80b-8.png'
            alt='logo'
          />
        </div>
        <div className='body row'>
          <div className='body-left col-9'>
            <Carousel effect='fade' arrows autoplay>
              <div>
                <img
                  src='https://media.hdu.edu.vn/Media/1_hdu_home/FolderFunc/202211/Images/316541171-5725704574190949-1954061012442463331-n-20221130085006-e.jpg'
                  alt='img 1'
                />
              </div>
              <div>
                <img
                  src='https://media.hdu.edu.vn/Media/1_hdu_home/FolderFunc/202211/Images/316818259-5726595544101852-8016896644078465546-n-20221130085005-e.jpg'
                  alt='img 2'
                />
              </div>
              <div>
                <img
                  src='https://media.hdu.edu.vn/Media/1_hdu_home/FolderFunc/202404/Images/z5326491543438-20240408090949-e.jpg'
                  alt='img 3'
                />
              </div>
            </Carousel>
          </div>
          <div className='body-right col-3'>
            <div className='mt-5'>
              <p className='title'>ĐĂNG NHẬP HỆ THỐNG</p>
              <div className='mt-5 pb-2'>
                <Form className='form-login'>
                  <Form.Item
                    name='username'
                    validateStatus={message.msgUn ? "error" : ""}
                    help={message.msgUn}>
                    {" "}
                    <Input
                      className='ip'
                      value={username}
                      onChange={handleRenderDataChange}
                      name='username'
                      placeholder='Tên đăng nhập'
                    />
                  </Form.Item>
                  <Form.Item
                    className='mt-3'
                    name='password'
                    validateStatus={message.msgPw ? "error" : ""}
                    help={message.msgPw}>
                    <Input.Password
                      className='ip'
                      name='password'
                      value={password}
                      onChange={handleRenderDataChange}
                      placeholder='Mật khẩu'
                      iconRender={(visible) =>
                        visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                      }
                      type={isShowPassword ? "text" : "password"}
                    />
                  </Form.Item>

                  <div className='text-center text-lg-start mt-4 pt-2'>
                    <input
                      value='Đăng nhập'
                      type='submit'
                      className='btn'
                      onClick={handleLogin}
                    />
                  </div>
                </Form>
                <div className='bonus'>
                  <button className='p-1' title='Dành cho sinh viên'>
                    <a href='/tra-cuu-van-bang'>Tra cứu văn bằng</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
