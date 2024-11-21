import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyBarChart = () => {
  // Dữ liệu của biểu đồ
  const data = {
    labels: [
      " 1",
      " 2",
      " 3",
      " 4",
      " 5",
      " 6",
      " 7",
      " 8",
      " 9",
      " 10",
      " 11",
      " 12",
    ],
    datasets: [
      {
        label: "Số lượng văn bằng",
        data: [2, 9, 3, 5, 14, 12, 19, 6, 10, 7, 5, 6],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Cấu hình các tùy chọn biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Thống kê số lượng văn bằng hàng ",
      },
    },
  };

  return (
    <div className='card-body'>
      <div className='chart-container' style={{ minHeight: "375px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MyBarChart;
