import React, { useState, useEffect } from "react";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import {
  DollarSign,
  Users,
  Calendar,
  ArrowUp,
  ArrowDown,
  Activity,
  Filter,
  Car,
} from "lucide-react";

// Định nghĩa các kiểu dữ liệu dựa trên mô hình ERD
interface Payment {
  _id: string;
  bookingId: string;
  customerId: string;
  amount: number;
  method: "cash" | "card" | "banking" | "wallet";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
  transactionInfo: string;
  createdAt: Date;
  updatedAt: Date;
}

interface FinancialSummary {
  totalRevenue: number;
  totalTrips: number;
  totalDrivers: number;
  averageRating: number;
  pendingPayments: number;
  completedPayments: number;
  failedPayments: number;
  refundedPayments: number;
}

interface TimeFilter {
  startDate: Date;
  endDate: Date;
  label: string;
}

// Màu sắc cho biểu đồ
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const PAYMENT_STATUS_COLORS = {
  completed: "#10B981",
  pending: "#F59E0B",
  failed: "#EF4444",
  refunded: "#8B5CF6",
};

// Component chính
const FinancialDashboard: React.FC = () => {
  // State cho bộ lọc thời gian và dữ liệu
  const [currentTimeFilter, setCurrentTimeFilter] =
    useState<string>("thisWeek");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [summary, setSummary] = useState<FinancialSummary>({
    totalRevenue: 0,
    totalTrips: 0,
    totalDrivers: 0,
    averageRating: 0,
    pendingPayments: 0,
    completedPayments: 0,
    failedPayments: 0,
    refundedPayments: 0,
  });
  const [timeFrameOptions, setTimeFrameOptions] = useState<TimeFilter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Hàm khởi tạo các tùy chọn khung thời gian
  const initializeTimeFrames = () => {
    const today = new Date();
    const startOfThisWeek = new Date(
      today.setDate(today.getDate() - today.getDay())
    );
    startOfThisWeek.setHours(0, 0, 0, 0);

    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(endOfThisWeek.getDate() + 6);
    endOfThisWeek.setHours(23, 59, 59, 999);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const endOfLastWeek = new Date(endOfThisWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 7);

    // Tháng này
    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    // Tháng trước
    const startOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const endOfLastMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      0,
      23,
      59,
      59,
      999
    );

    // Năm nay
    const startOfThisYear = new Date(today.getFullYear(), 0, 1);
    const endOfThisYear = new Date(
      today.getFullYear(),
      11,
      31,
      23,
      59,
      59,
      999
    );

    setTimeFrameOptions([
      {
        startDate: startOfThisWeek,
        endDate: endOfThisWeek,
        label: "Tuần này",
      },
      {
        startDate: startOfLastWeek,
        endDate: endOfLastWeek,
        label: "Tuần trước",
      },
      {
        startDate: startOfThisMonth,
        endDate: endOfThisMonth,
        label: "Tháng này",
      },
      {
        startDate: startOfLastMonth,
        endDate: endOfLastMonth,
        label: "Tháng trước",
      },
      {
        startDate: startOfThisYear,
        endDate: endOfThisYear,
        label: "Năm nay",
      },
    ]);
  };

  // Dữ liệu mẫu cho các biểu đồ và đồ thị
  const generateMockData = () => {
    // Doanh thu theo ngày (7 ngày)
    const dailyRevenueData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 6 + i);
      return {
        date: date.toLocaleDateString("vi-VN", { weekday: "short" }),
        revenue: Math.floor(Math.random() * 5000000) + 1000000,
        trips: Math.floor(Math.random() * 50) + 10,
      };
    });

    // Doanh thu theo tháng (6 tháng)
    const monthlyRevenueData = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - 5 + i);
      return {
        month: date.toLocaleDateString("vi-VN", { month: "short" }),
        revenue: Math.floor(Math.random() * 50000000) + 10000000,
        trips: Math.floor(Math.random() * 500) + 100,
      };
    });

    // Phân bổ phương thức thanh toán
    const paymentMethodData = [
      { name: "Tiền mặt", value: Math.floor(Math.random() * 40) + 20 },
      { name: "Thẻ", value: Math.floor(Math.random() * 30) + 15 },
      { name: "Chuyển khoản", value: Math.floor(Math.random() * 25) + 10 },
      { name: "Ví điện tử", value: Math.floor(Math.random() * 20) + 5 },
    ];

    // Phân bổ trạng thái thanh toán
    const paymentStatusData = [
      {
        name: "Hoàn thành",
        value: Math.floor(Math.random() * 70) + 50,
        color: PAYMENT_STATUS_COLORS.completed,
      },
      {
        name: "Đang chờ",
        value: Math.floor(Math.random() * 20) + 10,
        color: PAYMENT_STATUS_COLORS.pending,
      },
      {
        name: "Thất bại",
        value: Math.floor(Math.random() * 10) + 5,
        color: PAYMENT_STATUS_COLORS.failed,
      },
      {
        name: "Hoàn tiền",
        value: Math.floor(Math.random() * 10) + 2,
        color: PAYMENT_STATUS_COLORS.refunded,
      },
    ];

    // Tạo dữ liệu mẫu cho thanh toán
    const mockPayments: Payment[] = Array.from({ length: 50 }, (_, i) => {
      const createdAt = new Date();
      createdAt.setDate(createdAt.getDate() - Math.floor(Math.random() * 30));

      const methods = ["cash", "card", "banking", "wallet"] as const;
      const statuses = ["pending", "completed", "failed", "refunded"] as const;

      return {
        _id: `payment_${i + 1}`,
        bookingId: `booking_${Math.floor(Math.random() * 100) + 1}`,
        customerId: `customer_${Math.floor(Math.random() * 50) + 1}`,
        amount: Math.floor(Math.random() * 500000) + 50000,
        method: methods[Math.floor(Math.random() * methods.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        transactionId: `trans_${Math.floor(Math.random() * 1000) + 1}`,
        transactionInfo: "Payment info details",
        createdAt: createdAt,
        updatedAt: new Date(),
      };
    });

    // Tổng hợp dữ liệu tóm tắt
    const mockSummary: FinancialSummary = {
      totalRevenue: mockPayments.reduce(
        (sum, payment) =>
          payment.status === "completed" ? sum + payment.amount : sum,
        0
      ),
      totalTrips: 428,
      totalDrivers: 52,
      averageRating: 4.7,
      pendingPayments: mockPayments.filter((p) => p.status === "pending")
        .length,
      completedPayments: mockPayments.filter((p) => p.status === "completed")
        .length,
      failedPayments: mockPayments.filter((p) => p.status === "failed").length,
      refundedPayments: mockPayments.filter((p) => p.status === "refunded")
        .length,
    };

    return {
      dailyRevenueData,
      monthlyRevenueData,
      paymentMethodData,
      paymentStatusData,
      mockPayments,
      mockSummary,
    };
  };

  // Effect để khởi tạo dữ liệu
  useEffect(() => {
    initializeTimeFrames();
    const { mockPayments, mockSummary } = generateMockData();

    setTimeout(() => {
      setPayments(mockPayments);
      setSummary(mockSummary);
      setIsLoading(false);
    }, 800); // Giả lập thời gian tải
  }, []);

  // Format tiền tệ
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Format ngày tháng
  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Lấy dữ liệu biểu đồ dựa trên bộ lọc thời gian
  const {
    dailyRevenueData,
    monthlyRevenueData,
    paymentMethodData,
    paymentStatusData,
  } = generateMockData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 relative z-0">
      {/* Thanh tiêu đề */}
      <header className="bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 p-4 md:p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Quản lý Tài chính
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Theo dõi doanh thu và thanh toán của hệ thống đặt xe
        </p>
      </header>
      <div className="p-4 md:p-6">
        {/* Bộ lọc thời gian */}
        <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Khung thời gian
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {timeFrameOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTimeFilter(`option_${index}`)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentTimeFilter === `option_${index}`
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
              <button className="flex items-center px-4 py-2 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300">
                <Filter className="w-4 h-4 mr-2" />
                Tùy chỉnh
              </button>
            </div>
          </div>
        </div>

        {/* Thẻ tóm tắt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Tổng doanh thu */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">+12.5%</span>
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Tổng doanh thu
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {formatCurrency(summary.totalRevenue)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              So với kỳ trước
            </p>
          </div>

          {/* Tổng chuyến đi */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
                <Car className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">+8.3%</span>
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Tổng chuyến đi
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {summary.totalTrips.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              So với kỳ trước
            </p>
          </div>

          {/* Tài xế hoạt động */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex items-center text-green-600 dark:text-green-400">
                <ArrowUp className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">+5.2%</span>
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Tài xế hoạt động
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {summary.totalDrivers}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              So với kỳ trước
            </p>
          </div>

          {/* Đánh giá trung bình */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
                <Activity className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="flex items-center text-red-600 dark:text-red-400">
                <ArrowDown className="w-4 h-4 mr-1" />
                <span className="text-xs font-medium">-0.2</span>
              </div>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm mb-1">
              Đánh giá trung bình
            </h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {summary.averageRating.toFixed(1)}/5.0
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              So với kỳ trước
            </p>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Doanh thu theo thời gian */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Doanh thu theo thời gian
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-200 dark:border-zinc-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                  Ngày
                </button>
                <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                  Tuần
                </button>
                <button className="px-3 py-1 border border-gray-200 dark:border-zinc-700 rounded text-xs font-medium text-gray-700 dark:text-gray-300">
                  Tháng
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={dailyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip formatter={(value: any) => formatCurrency(value)} />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="revenue"
                    name="Doanh thu"
                    fill="#0284c7"
                    radius={[4, 4, 0, 0]}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="trips"
                    name="Số chuyến"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Phân bổ thanh toán */}
          <div className="bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-6">
              Phương thức thanh toán
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend
                    layout="vertical"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Thống kê trạng thái và giao dịch gần đây */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Thống kê trạng thái thanh toán */}
          <div className="lg:col-span-1 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-5">
              Trạng thái thanh toán
            </h3>
            <div className="space-y-4">
              {paymentStatusData.map((status, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-3"
                      style={{ backgroundColor: status.color }}
                    ></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {status.name}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-800 dark:text-gray-200 font-medium">
                      {status.value}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">
                      (
                      {(
                        (status.value /
                          paymentStatusData.reduce(
                            (sum, item) => sum + item.value,
                            0
                          )) *
                        100
                      ).toFixed(1)}
                      %)
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-zinc-700">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Chi tiết thanh toán
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tổng thanh toán
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {(
                      summary.pendingPayments +
                      summary.completedPayments +
                      summary.failedPayments +
                      summary.refundedPayments
                    ).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Đã hoàn thành
                  </span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {summary.completedPayments.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Đang chờ
                  </span>
                  <span className="font-medium text-yellow-600 dark:text-yellow-400">
                    {summary.pendingPayments.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Thất bại
                  </span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    {summary.failedPayments.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Hoàn tiền
                  </span>
                  <span className="font-medium text-purple-600 dark:text-purple-400">
                    {summary.refundedPayments.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Giao dịch gần đây */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                Giao dịch gần đây
              </h3>
              <button className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium">
                Xem tất cả
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-zinc-700">
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-3 px-4">
                      ID Giao dịch
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-3 px-4">
                      Ngày
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-3 px-4">
                      Phương thức
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-3 px-4">
                      Số tiền
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider py-3 px-4">
                      Trạng thái
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.slice(0, 5).map((payment, idx) => (
                    <tr 
                      key={payment._id} 
                      className={`hover:bg-gray-50 dark:hover:bg-zinc-700 ${
                        idx !== payments.slice(0, 5).length - 1 ? "border-b border-gray-200 dark:border-zinc-700" : ""
                      }`}
            >
                      <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300 */}
    </div>
  );
};

export default FinancialDashboard;
