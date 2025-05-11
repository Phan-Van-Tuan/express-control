import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ShieldCheck, Ban, CheckCircle } from "lucide-react";
import { useLanguage } from "../hooks/use-language";

const mockDriver = {
  id: "DRV001",
  name: "Nguyễn Văn A",
  phone: "0909123456",
  email: "nguyenvana@example.com",
  status: "pending", // approved | blocked | pending
  license: {
    verified: true,
    url: "#",
  },
  vehicle: {
    verified: false,
    url: "#",
  },
  insurance: {
    verified: true,
    url: "#",
  },
};

export default function DriverDetailPage() {
  const driver = mockDriver; // dùng tạm dữ liệu mock
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Driver Detail: {driver.name}</h2>
        <Badge
          variant={
            driver.status === "approved"
              ? "default"
              : driver.status === "blocked"
              ? "destructive"
              : "destructive"
          }
        >
          {driver.status === "approved"
            ? "Đã duyệt"
            : driver.status === "blocked"
            ? "Đã chặn"
            : "Chờ duyệt"}
        </Badge>
      </div>

      <Card>
        <h3>Thông tin cơ bản</h3>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <strong>ID:</strong> {driver.id}
          </div>
          <div>
            <strong>Họ tên:</strong> {driver.name}
          </div>
          <div>
            <strong>SĐT:</strong> {driver.phone}
          </div>
          <div>
            <strong>Email:</strong> {driver.email}
          </div>
        </CardContent>
      </Card>

      <Card>
        <h3>Hồ sơ và phương tiện</h3>
        <CardContent className="space-y-3">
          {[
            { label: "Giấy phép lái xe", data: driver.license },
            { label: "Giấy tờ xe", data: driver.vehicle },
            { label: "Bảo hiểm", data: driver.insurance },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between border p-3 rounded-md"
            >
              <div className="space-y-1">
                <p className="font-medium">{item.label}</p>
                <a
                  href={item.data.url}
                  target="_blank"
                  className="text-sm text-blue-600 underline"
                >
                  Xem giấy tờ
                </a>
              </div>
              {item.data.verified ? (
                <Badge variant="default">Đã xác minh</Badge>
              ) : (
                <Badge variant="destructive">Chưa xác minh</Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-2">
        {driver.status === "pending" && (
          <Button variant="default">
            <CheckCircle className="w-4 h-4 mr-1" />
            Duyệt tài khoản
          </Button>
        )}
        {driver.status !== "blocked" && (
          <Button variant="destructive">
            <Ban className="w-4 h-4 mr-1" />
            Chặn tài khoản
          </Button>
        )}
        {driver.status === "blocked" && (
          <Button variant="outline">
            <ShieldCheck className="w-4 h-4 mr-1" />
            Kích hoạt lại
          </Button>
        )}
      </div>
    </div>
  );
}
