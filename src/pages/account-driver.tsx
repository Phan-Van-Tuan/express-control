// pages/driver/index.tsx

import { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableHeader,
} from "../components/ui/table";
import { Search, Eye, CheckCircle, FileSearch } from "lucide-react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import DriverDetailPage from "./account-driver-[id]";
import EmptyDetailPlaceholder from "../components/ui/empty";
import { cn } from "../lib/utils";
import AddressSelector from "../components/base/AddressSelector ";
import Modal from "../components/base/Modal";

const drivers = [
  {
    id: "DRV001",
    name: "Nguyễn Văn A",
    phone: "0909123456",
    status: "pending",
    license: true,
    vehicle: true,
  },
  {
    id: "DRV002",
    name: "Trần Thị B",
    phone: "0909988776",
    status: "approved",
    license: true,
    vehicle: false,
  },
];

export default function DriverPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<
    "pending" | "blocked" | "active" | "inactive" | "standby"
  >("pending");
  const [selected, setSelected] = useState("");

  const closeModel = () => {
    setSelected("");
  };

  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.phone.includes(search)
  );

  return (
    <div className="text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-semibold px-2">Driver Management</h1>
      <Card className="grid grid-cols-1 mt-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-2 mb-2">
          <Card
            className={cn(
              "flex justify-between border-b-4",
              activeTab === "pending" && " border-b-green-400"
            )}
            onClick={() => {
              setActiveTab("pending");
            }}
          >
            <p>Pending</p>
            <Badge variant="info">{drivers.length}</Badge>
          </Card>
          <Card
            className={cn(
              "flex justify-between border-b-4",
              activeTab === "blocked" && " border-b-green-400"
            )}
            onClick={() => {
              setActiveTab("blocked");
            }}
          >
            <p>Blocked</p>
            <Badge variant="destructive">{drivers.length}</Badge>
          </Card>
          <Card
            className={cn(
              "flex justify-between border-b-4",
              activeTab === "inactive" && " border-b-green-400"
            )}
            onClick={() => {
              setActiveTab("inactive");
            }}
          >
            <p>Inactive</p>
            <Badge variant="disable">{drivers.length}</Badge>
          </Card>
          <Card
            className={cn(
              "flex justify-between border-b-4",
              activeTab === "standby" && " border-b-green-400"
            )}
            onClick={() => {
              setActiveTab("standby");
            }}
          >
            <p>Standby</p>
            <Badge variant="warring">{drivers.length}</Badge>
          </Card>
          <Card
            className={cn(
              "flex justify-between border-b-4",
              activeTab === "active" && " border-b-green-400"
            )}
            onClick={() => {
              setActiveTab("active");
            }}
          >
            <p>Active</p>
            <Badge>{drivers.length}</Badge>
          </Card>
          <Button className="h-full">Add Driver</Button>
        </div>
        <Card className="rounded-none lg:col-span-2">
          <div className="flex justify-between items-center">
            <h2 className="text-lg p-2 mb-4">List</h2>
            <div className="flex gap-2 items-center">
              <Input
                placeholder="search ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[250px]"
              />
              <Button variant="default">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-1 gap-4 mt-4 ">
            <div className="flex flex-col">
              {drivers.map((d) => (
                <Card className="mb-2" onClick={() => setSelected(d.id)}>
                  <p>{d.id}</p>
                  <p>Tôi muốn trở thành tài xế Hà Nội -- Hải Phòng</p>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      </Card>
      {/* <AddressSelector /> */}
      <Modal
        isOpen={selected !== ""}
        showCloseButton={false}
        size="full"
        type="custom"
      >
        {" "}
        <Card className="rounded-l-none lg:col-span-3 border-none">
          <Button
            variant="outline"
            className="mb-3"
            onClick={() => {
              setSelected("");
            }}
          >
            Close
          </Button>
          {selected ? (
            <DriverDetailPage />
          ) : (
            <EmptyDetailPlaceholder className="min-h-60" />
          )}
        </Card>
      </Modal>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Họ tên</TableHead>
              <TableHead>SĐT</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>GPLX</TableHead>
              <TableHead>Xe</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDrivers.map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driver.id}</TableCell>
                <TableCell>{driver.name}</TableCell>
                <TableCell>{driver.phone}</TableCell>
                <TableCell>
                  {driver.status === "approved" ? (
                    <span className="text-green-600 font-medium">Đã duyệt</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">
                      Chờ duyệt
                    </span>
                  )}
                </TableCell>
                <TableCell>{driver.license ? "✔️" : "❌"}</TableCell>
                <TableCell>{driver.vehicle ? "✔️" : "❌"}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="icon" variant="ghost" title="Xem chi tiết">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" title="Kiểm tra giấy tờ">
                    <FileSearch className="w-4 h-4" />
                  </Button>
                  {driver.status === "pending" && (
                    <Button size="icon" variant="ghost" title="Duyệt">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

function RouteForm() {
  const [route, setRoute] = useState({
    name: "",
    startPoint: "",
    endPoint: "",
    distance: "",
    duration: "",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Tuyến đường đã thêm:", route);
    // Gửi API đến backend ở đây
    alert(`Đã thêm tuyến ${route.name}`);
    setRoute({
      name: "",
      startPoint: "",
      endPoint: "",
      distance: "",
      duration: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Thêm tuyến đường mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {/* Tên tuyến */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tuyến*
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={route.name}
              onChange={(e) => setRoute({ ...route, name: e.target.value })}
            />
          </div>

          {/* Điểm đi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Điểm xuất phát*
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={route.startPoint}
              onChange={(e) =>
                setRoute({ ...route, startPoint: e.target.value })
              }
            />
          </div>

          {/* Điểm đến */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Điểm kết thúc*
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={route.endPoint}
              onChange={(e) => setRoute({ ...route, endPoint: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Khoảng cách */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Khoảng cách (km)*
              </label>
              <input
                type="number"
                required
                className="w-full p-2 border rounded-md"
                value={route.distance}
                onChange={(e) =>
                  setRoute({ ...route, distance: e.target.value })
                }
              />
            </div>

            {/* Thời gian dự kiến */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Thời gian (phút)*
              </label>
              <input
                type="number"
                required
                className="w-full p-2 border rounded-md"
                value={route.duration}
                onChange={(e) =>
                  setRoute({ ...route, duration: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        >
          Thêm tuyến đường
        </button>
      </form>
    </div>
  );
}

function DriverForm() {
  const [driver, setDriver] = useState({
    name: "",
    phone: "",
    license: "",
    status: "active",
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Tài xế đã thêm:", driver);
    // Gửi API đến backend ở đây
    alert(`Đã thêm tài xế ${driver.name}`);
    setDriver({ name: "", phone: "", license: "", status: "active" });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Thêm tài xế mới</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tên tài xế */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên tài xế*
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={driver.name}
              onChange={(e) => setDriver({ ...driver, name: e.target.value })}
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại*
            </label>
            <input
              type="tel"
              required
              className="w-full p-2 border rounded-md"
              value={driver.phone}
              onChange={(e) => setDriver({ ...driver, phone: e.target.value })}
            />
          </div>

          {/* Bằng lái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số bằng lái*
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md"
              value={driver.license}
              onChange={(e) =>
                setDriver({ ...driver, license: e.target.value })
              }
            />
          </div>

          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Trạng thái
            </label>
            <select
              className="w-full p-2 border rounded-md"
              value={driver.status}
              onChange={(e) => setDriver({ ...driver, status: e.target.value })}
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm ngừng</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Thêm tài xế
        </button>
      </form>
    </div>
  );
}
