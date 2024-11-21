import React, {useState} from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import { useNavigate } from "react-router-dom";
import { getDetailDiplomaApi } from "../../services/diplomaService";
import "./SearchDiploma.scss";

const SearchDiplomaPage = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const handleChangePage = (page) => {
    navigate(page);
  }

  const handleGetValueInput = (e) => {
    const {name, value} = e.target;
    if(name === "id"){
      setId(value);
    }
  }
  const onFinish = async () => {
    let res = await getDetailDiplomaApi(id);
    console.log(res.data.data.data)
    if(res.data.data.errcode === 0){
      navigate("/thong-tin-van-bang", { state: res.data.data.data });
    }else{
      message.warning("Không tìm thấy văn bằng bạn yêu cầu!");
    }
  };

  return (
    <div className="search-container">
      <div className="header pt-2 pb-2">
        <img
          src="https://media.hdu.edu.vn/Media/2_SV_HDU/Images/logo-congsinhvien6b33a80b-8.png"
          alt="logo"
        />
      </div>
      <div className="body mt-3">
        <div className="search">
          <div className="form-input p-4">
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <h5 className="mb-3">Tra cứu văn bằng</h5>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Họ tên"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                  >
                    <Input placeholder="Họ tên sinh viên" name="name" onChange={handleGetValueInput}/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Mã sinh viên"
                    name="msv"
                    rules={[{ required: true, message: "Vui lòng nhập mã sinh viên" }]}
                  >
                    <Input placeholder="Mã sinh viên" name="msv" onChange={handleGetValueInput}/>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="CMND/CCCD"
                name="cccd"
                rules={[{ required: true, message: "Vui lòng nhập CMND/CCCD" }]}
              >
                <Input placeholder="CMND/CCCD" name="cccd" onChange={handleGetValueInput}/>
              </Form.Item>
              <Form.Item
                label="Số hiệu văn bằng"
                name="id"
                rules={[{ required: true, message: "Vui lòng nhập số hiệu văn bằng" }]}
              >
                <Input placeholder="Số hiệu văn bằng" name="id" onChange={handleGetValueInput}/>
              </Form.Item>
              <Form.Item className="d-flex justify-content-center" >
              <Button type="primary" danger htmlType="submit" style={{marginRight: "10px"}} onClick={() => handleChangePage("/")}>
                  Hủy bỏ
                </Button>
                <Button type="primary" htmlType="submit">
                  Tra cứu
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchDiplomaPage;
