import { create } from "zustand";
import { LucideUsers, Car, DollarSign, AlertCircle } from "lucide-react";

interface DashboardState {
  stats: Array<{
    label: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    route?: string;
  }>;
  accountData: Array<{ month: string; users: number }>;
  balanceData: Array<{ date: string; balance: number }>;
  financeData: Array<{
    month: string;
    income: number;
    platformFee: number;
    insuranceFee: number;
    taxFee: number;
  }>;
}

// Tạo các biến constant bên ngoài để tránh tạo mới mỗi lần render
const statsData = [
  {
    label: "Total Users",
    value: "1,240",
    icon: <LucideUsers className="w-5 h-5" />,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    route: "/users",
  },
  {
    label: "Active Rides",
    value: "312",
    icon: <Car className="w-5 h-5" />,
    color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    route: "/rides",
  },
  {
    label: "Total Revenue",
    value: "$24,530",
    icon: <DollarSign className="w-5 h-5" />,
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    route: "/revenue",
  },
  {
    label: "Incidents Reported",
    value: "5",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
    route: "/incidents",
  },
];

const accountData = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 200 },
  { month: "Mar", users: 150 },
  { month: "Apr", users: 220 },
  { month: "May", users: 310 },
];

export const useDashboardStore = create<DashboardState>(() => ({
  stats: statsData,
  accountData: accountData,
  balanceData: [
    { date: "1/4", balance: 1000 },
    { date: "5/4", balance: 1500 },
    { date: "10/4", balance: 1800 },
    { date: "15/4", balance: 1300 },
    { date: "20/4", balance: 2500 },
  ],
  financeData: [
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
  ],
}));
