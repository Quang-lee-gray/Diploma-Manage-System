import React, { useReducer, useEffect } from "react";
import {
  Button,
  Input,
  Upload,
  Modal,
  notification,
  Form,
  DatePicker,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { updateStudentApi } from "../../services/studentService.js";
import moment from "moment";
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const beforeUpload = (file) => {
  const isImage = file.type === "image/jpeg" || file.type === "image/png";
  return isImage || Upload.LIST_IGNORE; // Chỉ cho phép tải lên nếu là ảnh
};

// Reducer quản lý các state của sinh viên
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
    case "SET_ALL_FIELDS":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const UpdateStudentComponent = ({
  open,
  setOpen,
  onStudentUpdate,
  _id,
  student,
}) => {
  const [api, contextHolder] = notification.useNotification();

  // Sử dụng useReducer để quản lý tất cả các state
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
    academicField: "",
    yearOfAdmission: { start: "", end: "" },
    rank: "",
    image: [],
  };

  const [state, dispatch] = useReducer(studentReducer, initialState);

  useEffect(() => {
    if (student) {
      dispatch({
        type: "SET_ALL_FIELDS",
        payload: {
          studentId: student.studentId || "",
          fullName: student.fullName || "",
          CCCD: student.CCCD || "",
          address: student.address || "",
          nation: student.nation || "",
          phoneNumber: student.phoneNumber || "",
          dateOfBirth: student.dateOfBirth || "",
          category: student.category || "Bằng tốt nghiệp đại học",
          status: student.status,
          academicField: student.academicField || "",
          rank: student.rank !== undefined ? student.rank : "",
        },
      });
    }
  }, [student]);

  // Lấy giá trị từ input
  const handleGetValue = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
  };

  // Thay đổi hình ảnh
  const handleChangeImg = (info) => {
    const newFileList = [...info.fileList].slice(-1); // Chỉ lấy ảnh cuối cùng
    dispatch({ type: "SET_IMAGE", value: newFileList });
  };

  const handleDateChange = (dateString) => {
    dispatch({ type: "SET_FIELD", field: "dateOfBirth", value: dateString });
  };

  // Xử lý sinh viên
  const handleUpdateStudent = async () => {
    let student = await updateStudentApi(
      _id,
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
      `${state.image[0]?.thumbUrl || ""}`
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
        onStudentUpdate();
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
        <h5>Cập nhật thông tin sinh viên</h5>
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
                  placeholder='Mã sinh viên'
                  name='studentId'
                  value={state.studentId}
                  onChange={handleGetValue}
                />
                <label>Mã sinh viên</label>
              </div>
            </div>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Họ tên sinh viên'
                  name='fullName'
                  value={state.fullName}
                  onChange={handleGetValue}
                />
                <label>Họ tên sinh viên</label>
              </div>
            </div>
          </div>
          <div className='row g-2 mb-3'>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='CCCD/CMND'
                  name='CCCD'
                  value={state.CCCD}
                  onChange={handleGetValue}
                />
                <label>CCCD/CMND</label>
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
          </div>
          <div className='row g-2 mb-3'>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Dân tộc'
                  name='nation'
                  value={state.nation}
                  onChange={handleGetValue}
                />
                <label>Dân tộc</label>
              </div>
            </div>
            <div className='col-sm'>
              <div className='form-floating'>
                <input
                  type='tel'
                  className='form-control'
                  placeholder='Điện thoại'
                  name='phoneNumber'
                  value={state.phoneNumber}
                  onChange={handleGetValue}
                />
                <label>Điện thoại</label>
              </div>
            </div>
          </div>
          <div className='row g-2 mb-3'>
            <div className='col-sm'>
              <div className='form-floating'>
                <Input
                  value={state.category}
                  className='text-danger form-control'
                  disabled
                  onChange={(e) =>
                    dispatch({
                      type: "SET_FIELD",
                      field: "category",
                      value: e.target.value,
                    })
                  }
                />
                <label>Danh mục </label>
              </div>
            </div>
            <div className='col-sm'>
              <div className='form-floating'>
                <DatePicker
                  name='dateOfBirth'
                  className='form-control'
                  format='DD/MM/YYYY'
                  onChange={handleDateChange}
                  value={
                    state.dateOfBirth
                      ? moment(state.dateOfBirth, "DD/MM/YYYY")
                      : null
                  }
                />
                <label>Ngày sinh</label>
              </div>
            </div>
          </div>
          <div className='row g-2 mb-3'>
            <div className='col-md mb-3'>
              <div className='form-floating'>
                <select
                  className='form-select'
                  name='status'
                  value={state.status}
                  onChange={handleGetValue}>
                  <option value='true'>Đã hoàn thành</option>
                  <option value='false'>Đang học</option>
                </select>
                <label>Trạng thái</label>
              </div>
            </div>
            <div className='col-md mb-3'>
              <div className='form-floating'>
                <select
                  className='form-select'
                  name='academicField'
                  value={state.academicField}
                  onChange={handleGetValue}>
                  <option value='Công nghệ thông tin'>
                    Công nghệ thông tin
                  </option>
                  <option value='Công nghệ kỹ thuật'>Công nghệ kỹ thuật</option>
                  <option value='Sư phạm tin'>Sư phạm tin</option>
                  <option value='Ngôn ngữ anh'>Ngôn ngữ anh</option>
                  <option value='Nông - Lâm - Ngư nghiệp'>
                    Nông - Lâm - Ngư nghiệp
                  </option>
                  <option value='Sư phạm tiểu học'>Sư phạm tiểu học</option>
                  <option value='Kinh tế - Quản trị kinh doanh'>
                    Kinh tế - Quản trị kinh doanh
                  </option>
                </select>
                <label>Khoa</label>
              </div>
            </div>
          </div>
          <div className='d-flex justify-content-start'>
            <div className='col-auto'>
              <Form.Item label='Khóa học' labelCol={{ span: 30 }} />
            </div>
            <div className='row g-2 mb-3'>
              <div className='col-sm'>
                <div className='form-floating'>
                  <Input
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
                </div>
              </div>
              <div className='col-sm'>
                <div className='form-floating'>
                  <Input
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
              </div>
            </div>
          </div>
          <div className='row g-2 mb-3'>
            <div className='col-md-3'>
              <div className='form-floating'>
                <select
                  className='form-select'
                  name='rank'
                  value={state.rank}
                  onChange={handleGetValue}>
                  <option value='0'>Giỏi</option>
                  <option value='1'>Khá</option>
                  <option value='2'>Trung bình</option>
                  <option value='3'>Yếu</option>
                </select>
                <label>Xếp loại</label>
              </div>
            </div>
            <div className='col-md-3'></div>
            <div className='col-md-3'>
              <Form.Item
                name='upload'
                label='Ảnh'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                labelCol={{ span: 10 }}>
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
            </div>
          </div>

          <div className='d-flex justify-content-center'>
            <Button
              color='danger'
              variant='outlined'
              onClick={() => setOpen(false)}
              style={{ marginRight: "10px" }}>
              Hủy bỏ
            </Button>
            <Button type='primary' onClick={handleUpdateStudent}>
              Lưu thông tin
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateStudentComponent;
