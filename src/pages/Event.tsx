import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Edit,
  Trash,
  Search,
} from "lucide-react";

// Định nghĩa kiểu dữ liệu cho sự kiện
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

// Mẫu dữ liệu events
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Workshop về React",
    description:
      "Học về React Hooks và các kỹ thuật tiên tiến trong phát triển React Applications.",
    date: "2025-04-25",
    time: "10:00",
    location: "Hội trường A, Tầng 5",
    attendees: 45,
    status: "upcoming",
    createdAt: "2025-04-01",
    updatedAt: "2025-04-01",
  },
  {
    id: "2",
    title: "Hội thảo Chuyển đổi số",
    description:
      "Thảo luận về các xu hướng chuyển đổi số và ảnh hưởng đến doanh nghiệp.",
    date: "2025-05-10",
    time: "14:00",
    location: "Phòng hội nghị B",
    attendees: 120,
    status: "upcoming",
    createdAt: "2025-04-05",
    updatedAt: "2025-04-10",
  },
  {
    id: "3",
    title: "Tech Conference 2025",
    description:
      "Sự kiện lớn về công nghệ với sự tham gia của các chuyên gia hàng đầu.",
    date: "2025-06-15",
    time: "09:00",
    location: "Trung tâm Hội nghị Quốc tế",
    attendees: 500,
    status: "upcoming",
    createdAt: "2025-03-20",
    updatedAt: "2025-04-12",
  },
  {
    id: "4",
    title: "Buổi gặp mặt nhóm Dev",
    description: "Gặp gỡ và giao lưu giữa các developer trong công ty.",
    date: "2025-04-10",
    time: "18:00",
    location: "Quán cafe Tech Hub",
    attendees: 25,
    status: "completed",
    createdAt: "2025-03-25",
    updatedAt: "2025-03-25",
  },
  {
    id: "5",
    title: "Seminar về AI",
    description: "Thảo luận về các ứng dụng của AI trong phát triển sản phẩm.",
    date: "2025-04-15",
    time: "15:00",
    location: "Phòng họp C",
    attendees: 60,
    status: "cancelled",
    createdAt: "2025-03-30",
    updatedAt: "2025-04-08",
  },
];

// Component chính
const EventManagementPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    status: "upcoming",
  });

  // Lọc sự kiện theo từ khóa tìm kiếm
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý việc chọn sự kiện
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsCreating(false);
  };

  // Xử lý thay đổi form tạo sự kiện
  const handleNewEventChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý tạo sự kiện mới
  const handleCreateEvent = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const newEventWithId: Event = {
      ...(newEvent as Event),
      id: (events.length + 1).toString(),
      attendees: 0,
      createdAt: currentDate,
      updatedAt: currentDate,
    };

    setEvents([newEventWithId, ...events]);
    setSelectedEvent(newEventWithId);
    setIsCreating(false);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      status: "upcoming",
    });
  };

  // Xóa sự kiện
  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(null);
    }
  };

  // Hiển thị màu theo trạng thái
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
    // Có thể thêm logic fetch dữ liệu từ API ở đây
    if (events.length > 0 && !selectedEvent) {
      setSelectedEvent(events[0]);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Sidebar - Danh sách sự kiện */}
      <div className="w-1/3 border-r border-gray-200 dark:border-zinc-700 overflow-y-auto">
        <div className="p-4 sticky top-0 bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700 z-10">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Quản lý sự kiện
          </h1>

          {/* Tìm kiếm */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm sự kiện..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Nút tạo sự kiện */}
          <button
            onClick={() => {
              setIsCreating(true);
              setSelectedEvent(null);
            }}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Tạo sự kiện mới
          </button>
        </div>

        {/* Danh sách sự kiện */}
        <div className="p-4">
          {filteredEvents.length === 0 ? (
            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
              Không tìm thấy sự kiện phù hợp
            </div>
          ) : (
            <div className="space-y-3">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg cursor-pointer border ${
                    selectedEvent?.id === event.id
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                  } hover:border-blue-500 dark:hover:border-blue-500 transition-colors`}
                  onClick={() => handleSelectEvent(event)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {event.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status === "upcoming" && "Sắp diễn ra"}
                      {event.status === "ongoing" && "Đang diễn ra"}
                      {event.status === "completed" && "Đã hoàn thành"}
                      {event.status === "cancelled" && "Đã hủy"}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CalendarDays className="w-4 h-4 mr-1" />
                    {formatDate(event.date)}
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Nội dung chính - Chi tiết sự kiện hoặc Form tạo sự kiện */}
      <div className="flex-1 overflow-y-auto p-6">
        {isCreating ? (
          // Form tạo sự kiện mới
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Tạo sự kiện mới
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tên sự kiện
                </label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleNewEventChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
                  placeholder="Nhập tên sự kiện"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mô tả
                </label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleNewEventChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
                  placeholder="Mô tả chi tiết về sự kiện"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Ngày
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleNewEventChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Thời gian
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleNewEventChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Địa điểm
                </label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleNewEventChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
                  placeholder="Nhập địa điểm tổ chức"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Trạng thái
                </label>
                <select
                  name="status"
                  value={newEvent.status}
                  onChange={handleNewEventChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-gray-100"
                >
                  <option value="upcoming">Sắp diễn ra</option>
                  <option value="ongoing">Đang diễn ra</option>
                  <option value="completed">Đã hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCreateEvent}
                  disabled={
                    !newEvent.title || !newEvent.date || !newEvent.location
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  Tạo sự kiện
                </button>
              </div>
            </div>
          </div>
        ) : selectedEvent ? (
          // Chi tiết sự kiện
          <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                    {selectedEvent.title}
                  </h2>
                  <div className="mt-2 flex items-center">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        selectedEvent.status
                      )}`}
                    >
                      {selectedEvent.status === "upcoming" && "Sắp diễn ra"}
                      {selectedEvent.status === "ongoing" && "Đang diễn ra"}
                      {selectedEvent.status === "completed" && "Đã hoàn thành"}
                      {selectedEvent.status === "cancelled" && "Đã hủy"}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-700">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
                    Thông tin sự kiện
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CalendarDays className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Ngày
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                          {formatDate(selectedEvent.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Thời gian
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                          {selectedEvent.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Địa điểm
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                          {selectedEvent.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-0.5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Số người tham dự
                        </p>
                        <p className="text-gray-800 dark:text-gray-200">
                          {selectedEvent.attendees} người
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
                    Mô tả
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {selectedEvent.description}
                  </p>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Thời gian tạo
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {formatDate(selectedEvent.createdAt)}
                    </p>

                    {selectedEvent.updatedAt !== selectedEvent.createdAt && (
                      <>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-4 mb-2">
                          Cập nhật lần cuối
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {formatDate(selectedEvent.updatedAt)}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-700">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
                  Thao tác
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedEvent.status === "upcoming" && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        Bắt đầu sự kiện
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        Hủy sự kiện
                      </button>
                    </>
                  )}
                  {selectedEvent.status === "ongoing" && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Kết thúc sự kiện
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700">
                    Quản lý người tham dự
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-zinc-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700">
                    Xuất báo cáo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Trường hợp không có sự kiện nào được chọn
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <CalendarDays className="w-16 h-16 mb-4" />
            <p className="text-xl">
              Chọn một sự kiện để xem chi tiết hoặc tạo sự kiện mới
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventManagementPage;
