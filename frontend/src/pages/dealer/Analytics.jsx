import {
  Bar,
  Doughnut
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Product A",
        data: [10, 20, 15, 30, 40, 45, 20, 35],
        backgroundColor: "#0f172a"
      },
      {
        label: "Product B",
        data: [15, 10, 10, 25, 35, 40, 25, 30],
        backgroundColor: "#06b6d4"
      },
      {
        label: "Product C",
        data: [5, 10, 5, 35, 25, 40, 30, 20],
        backgroundColor: "#16a34a"
      }
    ]
  };

  const lineData = {
    labels: ["12 AM", "4 AM", "8 AM", "12 PM", "4 PM", "8 PM", "11 PM"],
    datasets: [
      {
        label: "Visitors",
        data: [50, 100, 80, 200, 300, 150, 100],
        borderColor: "#16a34a",
        tension: 0.4,
        fill: true,
        backgroundColor: "rgba(22, 163, 74, 0.1)"
      }
    ]
  };

  const miniLineData = {
    labels: Array.from({ length: 20 }, (_, i) => i + 1),
    datasets: [
      {
        data: [10, 12, 8, 13, 17, 20, 18, 16, 20, 22, 25, 23, 26, 30, 27, 26, 24, 22, 20, 18],
        borderColor: "#4ade80",
        tension: 0.3,
        fill: true,
        backgroundColor: "rgba(74, 222, 128, 0.1)"
      }
    ]
  };

  const doughnutData = {
    labels: ["Platform A", "Platform B"],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ["#06b6d4", "#16a34a"],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-br from-green-100 via-blue-100 to-white min-h-screen">
      {/* Top Bar Chart */}
      <div className="col-span-2 bg-transparent rounded-2xl p-4 shadow">
        <h2 className="font-bold text-lg mb-2">Dealer Sales Overview</h2>
        <Bar data={barData} options={{ responsive: true }} />
      </div>

      {/* Doughnut Chart */}
      <div className="bg-transparent rounded-2xl p-4 shadow flex items-center justify-center">
        <Doughnut data={doughnutData} options={{ cutout: "70%" }} />
      </div>
    </div>
  );
};

export default Analytics;
