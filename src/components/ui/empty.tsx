import React from "react";
import { FileQuestion } from "lucide-react"; // You can swap this with any Lucide icon

const EmptyDetailPlaceholder = ({
  icon: Icon = FileQuestion,
  title = "No item selected",
  description = "Please select an account to view its details.",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center text-gray-500 border border-dashed border-gray-300 rounded-md p-6 h-full ${className}`}
    >
      <Icon className="w-10 h-10 mb-4 text-gray-400" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default EmptyDetailPlaceholder;
