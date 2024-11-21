import React, {useState, useEffect } from "react";
import MyBarChart from "../MyBarChart/MyBarChart";
import { getAllDiplomaApi } from "../../services/diplomaService";
import { getAllApproverApi } from "../../services/approverService";
import { getAllStudentApi } from "../../services/studentService";
const DashboardComponent = () => {
  const [countDiploma, setCountDiploma] = useState(0);
  const [countApprover, setCountApprover] = useState(0);
  const [countStudent, setCountStudent] = useState(0);
  useEffect(() => {
    const handleGetAllDiploma = async () => {
      try {
        let res = await getAllDiplomaApi();
        if (res && res.data) {
          setCountDiploma(res.data.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching diplomas:", error);
      }
    };

    const handleGetAllApprover = async () => {
      try {
        let res = await getAllApproverApi();
        if (res && res.data) {
          setCountApprover(res.data.data.data.length);
        }
      } catch (error) {
        console.error("Error fetching approvers:", error);
      }
    };

    const handleGetAllStudent= async () => {
      try {
        let res = await getAllStudentApi();
        if (res && res.data) {
          setCountStudent(res.data.student.data.length);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    handleGetAllDiploma();
    handleGetAllApprover();
    handleGetAllStudent();
  }, []);
  return (
    <div className='container'>
      <div className='page-inner'>
        <div className='d-flex align-items-left align-items-md-center flex-column flex-md-row pt-2 pb-4'>
          <div>
            <h3 className='fw-bold mb-3 text-primary'>Dashboard</h3>
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-6 col-md-3'>
            <div className='card card-stats card-round'>
              <div className='card-body'>
                <div className='row align-items-center'>
                  <div className='col col-stats ms-3 ms-sm-0'>
                    <div className='numbers'>
                      <p className='card-category'>Số văn bằng đã cấp</p>
                      <h4 className='card-title'>{countDiploma}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-md-3'>
            <div className='card card-stats card-round'>
              <div className='card-body'>
                <div className='row align-items-center'>
                  <div className='col col-stats ms-3 ms-sm-0'>
                    <div className='numbers'>
                      <p className='card-category'>Số lượng sinh viên</p>
                      <h4 className='card-title'>{countStudent}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-6 col-md-3'>
            <div className='card card-stats card-round'>
              <div className='card-body'>
                <div className='row align-items-center'>
                  <div className='col col-stats ms-3 ms-sm-0'>
                    <div className='numbers'>
                      <p className='card-category'>Số người phê duyệt</p>
                      <h4 className='card-title'>{countApprover}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row mt-3'>
          <div className='col-md-9'>
            <div className='card card-round'>
              <div className='card-header'>
                <div className='card-head-row'>
                  <div className='card-title'>Thống kê văn bằng</div>
                </div>
              </div>
              <div className='card-body'>
                <div className='chart-container' style={{ minHeight: "375px" }}>
                  <MyBarChart />
                </div>
              </div>
            </div>
          </div>

          <div className='col-md-3 mt-3'>
            <div className='card card-primary card-round'>
              <div className='card-header'>
                <div className='card-title'>
                  Số lượng người tham gia hệ thống
                </div>
              </div>
              <div className='card-body pb-0'>
                <div className='mb-4 mt-2'>
                  <h1>564</h1>
                </div>
              </div>
            </div>

            <div className='card card-round mt-3'>
              <div className='card-body pb-0'>
                <div className='h1 fw-bold float-end text-primary'>+3%</div>
                <h2 className='mb-2'>3</h2>
                <p className='text-muted'>online</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
