import { Card, CardContent } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface RiderAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "active" | "blocked";
  totalTrips: number;
  joinedAt: string;
}

const mockData: RiderAccount[] = [
  {
    id: "r1",
    name: "Nguyen Van A",
    phone: "0909123456",
    email: "a@example.com",
    status: "active",
    totalTrips: 34,
    joinedAt: "2024-06-01",
  },
  {
    id: "r2",
    name: "Tran Thi B",
    phone: "0911223344",
    email: "b@example.com",
    status: "blocked",
    totalTrips: 12,
    joinedAt: "2024-07-15",
  },
];

export default function AccountTableRider() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [riders, setRiders] = useState<RiderAccount[]>([]);

  useEffect(() => {
    setRiders(mockData); // sau này có thể gọi API
  }, []);

  const getStatusBadge = (status: RiderAccount["status"]) => {
    return (
      <Badge variant={status === "active" ? "default" : "destructive"}>
        {status === "active" ? "active" : "destructive"}
      </Badge>
    );
  };

  const filtered = riders.filter(
    (rider) =>
      rider.name.toLowerCase().includes(search.toLowerCase()) ||
      rider.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card>
      <CardContent className="p-4 space-y-4 text-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Rider Account</h2>
          <Input
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 mx-4"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Phone number</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total trip</TableHead>
              <TableHead>Join date</TableHead>
              <TableHead className="text-right">Detail</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((rider) => (
              <TableRow key={rider.id}>
                <TableCell>{rider.name}</TableCell>
                <TableCell>{rider.phone}</TableCell>
                <TableCell>{rider.email}</TableCell>
                <TableCell>{getStatusBadge(rider.status)}</TableCell>
                <TableCell>{rider.totalTrips}</TableCell>
                <TableCell>{rider.joinedAt}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/account/rider/${rider.id}`)}
                  >
                    go
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
