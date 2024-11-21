import React, { useReducer } from "react";
import {
  Button,
  Input,
  Upload,
  Modal,
  notification,
  Form,
  DatePicker,
  Segmented,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { createStudentApi } from "../../services/studentService.js";
import "./CreateStudentComponent.scss";
import moment from "moment";
const { Option } = Select;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const beforeUpload = (file) => {
  const isImage = file.type === "image/jpeg" || file.type === "image/png";
  return isImage || Upload.LIST_IGNORE;
};

const studentReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "SET_YEAR":
      return {
        ...state,
        yearOfAdmission: {
          ...state.yearOfAdmission,
          [action.field]: action.value,
        },
      };
    case "SET_IMAGE":
      return {
        ...state,
        image: action.value,
      };
    default:
      return state;
  }
};

const CreateStudentComponent = ({ open, setOpen, onStudentCreate }) => {
  const [api, contextHolder] = notification.useNotification();
  const initialState = {
    studentId: "",
    fullName: "",
    CCCD: "",
    address: "",
    nation: "",
    phoneNumber: "",
    dateOfBirth: "",
    category: "Bằng tốt nghiệp đại học",
    status: "true",
    academicField: "Công nghệ thông tin",
    yearOfAdmission: { start: "", end: "" },
    rank: "",
    image: [],
    isApprove: "false",
  };

  const [state, dispatch] = useReducer(studentReducer, initialState);

  const handleGetValue = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  const handleChangeImg = (info) => {
    const newFileList = [...info.fileList].slice(-1);
    dispatch({ type: "SET_IMAGE", value: newFileList });
  };

  const handleDateChange = (dateString) => {
    dispatch({ type: "SET_FIELD", field: "dateOfBirth", value: dateString });
  };

  const handleCreateStudent = async () => {
    let student = await createStudentApi(
      state.studentId,
      state.fullName,
      state.address,
      state.CCCD,
      state.nation,
      state.phoneNumber,
      state.dateOfBirth,
      state.status,
      state.category,
      state.academicField,
      `${state.yearOfAdmission.start} - ${state.yearOfAdmission.end}`,
      state.rank,
      `${state.image[0]?.thumbUrl || ""}`,
      state.isApprove,
    );
    if (student) {
      const { errcode, errmsg } = student.data.data;
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
        <h5>Thêm mới sinh viên</h5>
        <Form
          className='mt-2 form-container'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout='horizontal'
          onFinish={handleCreateStudent}
          initialValues={state}
          style={{ maxWidth: 1500 }}>
          <Form.Item
            label='Mã sinh viên'
            name='studentId'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Input
              name='studentId'
              value={state.studentId}
              onChange={handleGetValue}
            />
          </Form.Item>
          <Form.Item
            label=' Họ tên sinh viên'
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
            label='CCCD/CMND'
            name='CCCD'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Input name='CCCD' value={state.CCCD} onChange={handleGetValue} />
          </Form.Item>
          <Form.Item label='Địa chỉ' name='address'>
            <Input
              name='address'
              value={state.address}
              onChange={handleGetValue}
            />
          </Form.Item>
          <Form.Item label='Dân tộc' name='nation'>
            <Input
              name='nation'
              value={state.nation}
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
          <Form.Item
            label='Ngày sinh'
            name='dateOfBirth'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <DatePicker
              name='dateOfBirth'
              format='DD/MM/YYYY'
              onChange={handleDateChange}
              value={
                state.dateOfBirth
                  ? moment(state.dateOfBirth, "DD/MM/YYYY")
                  : null
              }
            />
          </Form.Item>
          <Form.Item
            label='Trạng thái'
            name='status'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Segmented
              options={[
                { label: "Đang học", value: "false" },
                { label: "Đã hoàn thành", value: "true" },
              ]}
              value={state.status}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "status", value })
              }
            />
          </Form.Item>
          <Form.Item
            label='Khoa'
            name='academicField'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Select
              value={state.academicField}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "academicField", value })
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
          <Form.Item
            label='Khóa học'
            nane='yearOfAdmission'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <div className='row' style={{ marginLeft: "1px" }}>
              <Input
                className='col-sm-4'
                type='number'
                placeholder='Năm bắt đầu'
                name='start'
                value={state.yearOfAdmission.start}
                onChange={(e) =>
                  dispatch({
                    type: "SET_YEAR",
                    field: "start",
                    value: e.target.value,
                  })
                }
              />
              <Input
                className='col-sm-4'
                type='number'
                placeholder='Năm kết thúc'
                name='end'
                value={state.yearOfAdmission.end}
                onChange={(e) =>
                  dispatch({
                    type: "SET_YEAR",
                    field: "end",
                    value: e.target.value,
                  })
                }
              />
            </div>
          </Form.Item>
          <Form.Item
            label='Xếp loại'
            name='rank'
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Segmented
              value={state.rank}
              options={[
                { label: "Giỏi", value: "0" },
                { label: "Khá", value: "1" },
                { label: "Trung Bình", value: "2" },
                { label: "Yếu", value: "3" },
              ]}
              onChange={(value) =>
                dispatch({ type: "SET_FIELD", field: "rank", value })
              }
            />
          </Form.Item>
          <Form.Item
            name='upload'
            label='Ảnh'
            valuePropName='fileList'
            getValueFromEvent={normFile}
            rules={[
              { required: true, message: "Trường này không được để trống" },
            ]}>
            <Upload
              listType='picture-card'
              fileList={state.image}
              beforeUpload={beforeUpload}
              onChange={handleChangeImg}
              maxCount={1}>
              {state.image.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
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

export default CreateStudentComponent;
