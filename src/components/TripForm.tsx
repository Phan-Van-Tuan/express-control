import React, { useState } from "react";
import DatePicker from "./DatePicker";

type TripFormProps = {
  initialValues?: {
    startLocation?: string | object;
    endLocation?: string | object;
    startTime?: Date;
    endTime?: Date;
    departureTime?: Date;
    repeat?: number;
    price?: number;
    type?: string;
    availableSeats?: number;
    expireAt?: Date;
  };
  onSubmit: (values: {
    startLocation: string | object;
    endLocation: string | object;
    startTime: Date;
    endTime: Date;
    departureTime: Date;
    repeat: number;
    price: number;
    type: string;
    availableSeats: number;
    expireAt: Date;
  }) => void;
  buttonText?: string;
};

const TripForm: React.FC<TripFormProps> = ({
  initialValues = {},
  onSubmit,
  buttonText = "Submit",
}) => {
  const [formValues, setFormValues] = useState({
    startLocation: initialValues.startLocation || "",
    endLocation: initialValues.endLocation || "",
    startTime: initialValues.startTime || "",
    endTime: initialValues.endTime || "",
    departureTime: initialValues.departureTime || "",
    repeat: initialValues.repeat || 0,
    price: initialValues.price || 0,
    type: initialValues.type || "",
    availableSeats: initialValues.availableSeats || 0,
    expireAt: initialValues.expireAt || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formValues,
      startTime: new Date(formValues.startTime),
      endTime: new Date(formValues.endTime),
      departureTime: new Date(formValues.departureTime),
      expireAt: new Date(formValues.expireAt),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <div className="mb-5">
        <label
          htmlFor="startLocation"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Start Location
        </label>
        <input
          type="text"
          id="startLocation"
          name="startLocation"
          value={formValues.startLocation as string}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="endLocation"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          End Location
        </label>
        <input
          type="text"
          id="endLocation"
          name="endLocation"
          value={formValues.endLocation as string}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="startTime"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          startTime
        </label>
        <input
          type="text"
          id="startTime"
          name="startTime"
          value={formValues.startTime as string}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="endTime"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          endTime
        </label>
        <input
          type="text"
          id="endTime"
          name="endTime"
          value={formValues.endTime as string}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="departureTime"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          departureTime
        </label>
        <input
          type="text"
          id="departureTime"
          name="departureTime"
          value={formValues.departureTime as string}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="repeat"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Repeat
        </label>
        <input
          type="text"
          id="repeat"
          name="repeat"
          value={formValues.repeat as number}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formValues.price as number}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="availableSeats"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Available Seats
        </label>
        <input
          type="text"
          id="availableSeats"
          name="availableSeats"
          value={formValues.availableSeats as number}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="expireAt"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Expire At
        </label>
        <input
          type="text"
          id="expireAt"
          name="expireAt"
          value={formValues.expireAt as string}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <DatePicker></DatePicker>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {buttonText}
      </button>
    </form>
  );
};

export default TripForm;
