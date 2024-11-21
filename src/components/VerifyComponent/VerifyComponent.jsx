import React,{useState} from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Modal, Input, message} from "antd";
import { registerCertificateApi } from "../../services/certificateService.js";
import { updateSignatureApi, getDetailUserApi} from "../../services/userService.js";
import bcrypt from "bcryptjs";

const VerifyComponent = ({ open, setOpen, id, passw }) => {
  const [pw, setPw] = useState("");
  const [keys, setKeys] = useState({ publicKey: "", privateKey: "" });
  const [showKeyModal, setShowKeyModal] = useState(false);

  //get cookie by name
  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  let userInfo = JSON.parse(decodeURIComponent(getCookieValue("user")));
  
  //grant certificate
  const handleRegisterCertificate = async () => {
      let validatePassword = bcrypt.compareSync(pw, passw);
      if(validatePassword){
        if(keys.privateKey === ""){
          let response = await getDetailUserApi(userInfo._id);
          if(response && response.data.data.user.isSignature === true){
            message.warning("Chữ ký số của bạn đã được cấp trước đó. Vui lòng kiểm tra lại!");
            return;
          }else{
            let res = await registerCertificateApi(id);
            await updateSignatureApi(id, true);
            if (res && res.data.data.publicKey && res.data.data.privateKey) {
              setKeys({ publicKey: res.data.data.publicKey, privateKey: res.data.data.privateKey });
              setShowKeyModal(true); 
              setOpen(false);
            }else{
              message.error("Tạo chữ ký thất bại. Vui lòng thử lại!");
            }
          }
        }else{
          message.warning("Chữ ký số của bạn đã được cấp trước đó. Vui lòng kiểm tra lại!");
          return;
        }
      }else{
          message.error("Mật khẩu không đúng. Vui lòng thử lại!");
      }
  }
  return (
    <>
      <Modal
        className='mt-5'
        title={<p className="mt-3">Nhập mật khẩu đăng nhập của bạn để tạo chữ ký <i>(Chữ ký số chỉ được tạo 1 lần.)</i></p>}
        footer={
          <div>
            <Button danger type='primary' onClick={() => setOpen(false)} style={{marginRight:"10px"}}>
              Hủy bỏ
            </Button>
            <Button type='primary' onClick={handleRegisterCertificate}>
              Tạo chữ ký
            </Button>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}>
        <div>
        <Input.Password
          placeholder="Xác nhận mật khẩu"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={(e) => setPw(e.target.value)}
        />
        </div>
      </Modal>
      <Modal
        title="Thông tin chữ ký số"
        visible={showKeyModal}
        onCancel={() => setShowKeyModal(false)}
        footer={[
          <Button key="back" onClick={() => setShowKeyModal(false)}>
            Đóng
          </Button>,
          <Button key="download" onClick={() => {

            const element = document.createElement("a");
            const file = new Blob([`${keys.privateKey}`], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = `${userInfo.approver.fullName}(privateKey).txt`;
            document.body.appendChild(element);
            element.click();
            
          }}>
            Tải về
          </Button>
        ]}
      >
        <p>Private Key:</p>
        <Input disabled value={keys.privateKey} readOnly rows={5} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};
export default VerifyComponent;
