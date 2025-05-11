import { useState } from "react";
import { ChevronDown, Calendar, Upload, AlertCircle, Send } from "lucide-react";

export default function CreateNotificationPanel() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState("all");
  const [notificationType, setNotificationType] = useState({
    push: true,
    email: false,
    sms: false,
  });
  const [scheduled, setScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      title,
      content,
      audience,
      notificationType,
      scheduled,
      scheduledDateTime: scheduled ? `${scheduledDate} ${scheduledTime}` : null,
      attachment: file,
    });
  };

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <AlertCircle className="mr-3 text-blue-500 dark:text-blue-400" />
          <h1 className="text-2xl font-bold">Create Notification</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Notification Details */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Notification Details</h2>

            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Notification title"
                required
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium mb-1"
              >
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write notification content here..."
                required
              />
            </div>
          </div>

          {/* Attachment */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Attachment</h2>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                isDragging
                  ? "border-blue-500 bg-gray-200 dark:bg-gray-700"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
              }`}
            >
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop file here, or click to select file
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, PDF up to 10MB
                </p>
              </label>
              {file && (
                <div className="mt-4 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded p-2">
                  {file.name}
                </div>
              )}
            </div>
          </div>

          {/* Audience & Type */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Delivery Options</h2>

            <div className="mb-6">
              <label
                htmlFor="audience"
                className="block text-sm font-medium mb-1"
              >
                Audience
              </label>
              <div className="relative">
                <select
                  id="audience"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="appearance-none w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-4 pr-10 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Users</option>
                  <option value="drivers">Drivers Only</option>
                  <option value="customers">Customers Only</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <span className="block text-sm font-medium mb-2">
                Notification Type
              </span>
              <div className="space-y-3">
                {["push", "email", "sms"].map((type) => (
                  <div className="flex items-center" key={type}>
                    <input
                      id={type}
                      type="checkbox"
                      checked={
                        notificationType[type as keyof typeof notificationType]
                      }
                      onChange={() =>
                        setNotificationType((prev) => ({
                          ...prev,
                          [type]: !prev[type as keyof typeof notificationType],
                        }))
                      }
                      className="h-4 w-4 rounded border-gray-400 dark:border-gray-500 text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor={type} className="ml-2 text-sm">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Schedule</h2>
              <div className="flex items-center">
                <span className="text-sm mr-2">
                  {scheduled ? "Scheduled" : "Send immediately"}
                </span>
                <button
                  type="button"
                  onClick={() => setScheduled(!scheduled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    scheduled ? "bg-blue-500" : "bg-gray-400 dark:bg-gray-600"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      scheduled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {scheduled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium mb-1"
                  >
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required={scheduled}
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium mb-1"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-4 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={scheduled}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Notification
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
