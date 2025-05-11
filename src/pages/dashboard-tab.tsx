import { LucideUsers, Car, DollarSign, AlertCircle } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { cn } from "../lib/utils";

const stats = [
  {
    label: "Total Users",
    value: "1,240",
    icon: <LucideUsers className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    label: "Active Rides",
    value: "312",
    icon: <Car className="w-5 h-5" />,
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  },
  {
    label: "Total Revenue",
    value: "$24,530",
    icon: <DollarSign className="w-5 h-5" />,
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    label: "Incidents Reported",
    value: "5",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
  },
];

export default function DashboardPage() {
  return (
    <main className="p-2 space-y-6 flex-1">
      <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
        Dashboard
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-full w-10 h-10",
                stat.color
              )}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
              <p className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Placeholder cho biểu đồ, bảng v.v */}
      <Chart />
      <StackedRevenueChart />
    </main>
  );
}

const accountData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 200 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 220 },
  { month: "May", users: 310 },
];

const balanceData = [
  { date: "1/4", balance: 1000 },
  { date: "5/4", balance: 1500 },
  { date: "10/4", balance: 1800 },
  { date: "15/4", balance: 1300 },
  { date: "20/4", balance: 2500 },
];

export function Chart() {
  return (
    <div className="p-6 space-y-8">
      {/* Account Growth Bar Chart */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Account Growth</h2>
        <ResponsiveContainer width="100%" height={300} className="z-0">
          <BarChart data={accountData} className="z-0">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip wrapperStyle={{ zIndex: 0 }} />
            <Bar dataKey="users" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Balance Line Chart */}
      <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Balance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#22c55e"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const financeData = [
  {
    month: "Jan",
    income: 3000,
    platformFee: 200,
    insuranceFee: 120,
    taxFee: 80,
  },
  {
    month: "Feb",
    income: 4200,
    platformFee: 260,
    insuranceFee: 150,
    taxFee: 110,
  },
  {
    month: "Mar",
    income: 3900,
    platformFee: 240,
    insuranceFee: 140,
    taxFee: 100,
  },
  {
    month: "Apr",
    income: 5100,
    platformFee: 300,
    insuranceFee: 180,
    taxFee: 120,
  },
  {
    month: "May",
    income: 4700,
    platformFee: 280,
    insuranceFee: 170,
    taxFee: 110,
  },
];

export function StackedRevenueChart() {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Income & Detailed Fees</h2>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={financeData}
          margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#3b82f6" name="Income" />
          <Bar
            dataKey="platformFee"
            stackId="a"
            fill="#facc15"
            name="Platform Fee"
          />
          <Bar
            dataKey="insuranceFee"
            stackId="a"
            fill="#fb923c"
            name="Insurance"
          />
          <Bar dataKey="taxFee" stackId="a" fill="#ef4444" name="Tax" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
