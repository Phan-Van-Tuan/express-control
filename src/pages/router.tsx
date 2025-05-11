import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../components/ui/table";
import Modal from "../components/base/Modal";
import { useRoute } from "../hooks/use-route";
import { CheckCircle, Eye, FileSearch } from "lucide-react";
import AddressSelector from "../components/base/AddressSelector ";

export function RouteAssignmentPage() {
  const [newRoute, setNewRoute] = useState(false);
  const { routes, isLoading, error, refetch } = useRoute();
  return (
    <div className="p-4 text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-semibold">Route Assignment</h1>
      <Button
        className="my-4"
        onClick={() => {
          setNewRoute(true);
        }}
      >
        Add new route
      </Button>
      <Card>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          error && (
            <div className="flex">
              <p className="text-red-500">{error.message}, </p>
              <p className="text-blue-500" onClick={() => refetch()}>
                Try again
              </p>
            </div>
          )
        )}
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-12">
              <TableHead className="col-span-3">ID</TableHead>
              <TableHead className="col-span-3">From</TableHead>
              <TableHead className="col-span-3">To</TableHead>
              <TableHead className="col-span-1">Status</TableHead>
              <TableHead className="col-span-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {routes.map((r) => (
              <TableRow key={r._id} className="grid grid-cols-12">
                <TableCell className="col-span-3">{r._id}</TableCell>
                <TableCell className="col-span-3">
                  {r.from.properties.description}
                </TableCell>
                <TableCell className="col-span-3">
                  {r.to.properties.description}
                </TableCell>
                <TableCell className="col-span-1">active</TableCell>
                <TableCell className="flex gap-2 col-span-2">
                  <Button size="icon" variant="ghost" title="Xem chi tiết">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" title="Kiểm tra giấy tờ">
                    <FileSearch className="w-4 h-4" />
                  </Button>
                  {/* {r.status === "pending" && (
                    <Button size="icon" variant="ghost" title="Duyệt">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </Button>
                  )} */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <AssignDriver />
      <Modal
        isOpen={newRoute}
        onClose={() => {
          setNewRoute(false);
        }}
        type="custom"
      >
        <AddRoute />
      </Modal>
    </div>
  );
}

function AddRoute() {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [modal, setModal] = useState<"" | "start" | "end">("");

  const handleSubmit = async () => {
    setName("");
    setStart("");
    setEnd("");
    setDistance("");
    setDuration("");
  };

  return (
    <div className="max-w-xl grid gap-4">
      <h2 className="text-xl font-semibold">Create New Route</h2>
      <Input
        placeholder="Route name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Start location"
        value={start}
        onFocus={() => {
          setModal("start");
        }}
        onChange={(e) => setStart(e.target.value)}
      />
      <Input
        placeholder="End location"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
      />{" "}
      <Input
        placeholder="Distance"
        value={distance}
        onChange={(e) => setEnd(e.target.value)}
      />
      <Input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setEnd(e.target.value)}
      />{" "}
      <Button onClick={handleSubmit}>Add Route</Button>
      <Modal isOpen={modal === "start"} showCloseButton={false}>
        <AddressSelector
          title={"Start location"}
          onResult={(val) => {
            setStart(val.toString());
            setModal("");
          }}
        />
        <Button className="mt-4" onClick={() => setModal("")}>
          Confirm
        </Button>
      </Modal>
      <Modal isOpen={modal === "end"} showCloseButton={false}>
        <AddressSelector
          title={"End location"}
          onResult={(val) => {
            setEnd(val.toString());
            setModal("");
          }}
        />
      </Modal>
    </div>
  );
}

function AssignDriver() {
  const [routes, setRoutes] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [routeId, setRouteId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [day, setDay] = useState("even");

  useEffect(() => {
    // fetch danh sách route và driver
    fetch("/api/routes")
      .then((res) => res.json())
      .then(setRoutes);
    fetch("/api/drivers")
      .then((res) => res.json())
      .then(setDrivers);
  }, []);

  const handleAssign = async () => {
    await fetch("/api/assignments", {
      method: "POST",
      body: JSON.stringify({ routeId, driverId, schedule: day }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Phân công thành công");
  };

  return (
    <div className="space-y-4 max-w-xl">
      <h2 className="text-xl font-semibold">Assign Driver to Route</h2>

      {/* <Select onValueChange={setRouteId}>
        <SelectItem value="">Select Route</SelectItem>
        {routes.map((r) => (
          <SelectItem key={r._id} value={r._id}>{r.name}</SelectItem>
        ))}
      </Select>

      <Select onValueChange={setDriverId}>
        <SelectItem value="">Select Driver</SelectItem>
        {drivers.map((d) => (
          <SelectItem key={d._id} value={d._id}>{d.fullName}</SelectItem>
        ))}
      </Select>

      <Select onValueChange={setDay}>
        <SelectItem value="even">Even Days</SelectItem>
        <SelectItem value="odd">Odd Days</SelectItem>
        <SelectItem value="custom">Custom</SelectItem>
      </Select> */}

      <Button onClick={handleAssign}>Assign</Button>
    </div>
  );
}
