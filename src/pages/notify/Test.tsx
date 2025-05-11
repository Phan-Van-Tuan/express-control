import { useState } from "react";
import {
  Save,
  Clock,
  Users,
  DollarSign,
  Percent,
  Shield,
  Settings,
  Info,
} from "lucide-react";

interface Config {
  bookingTimeout: number;
  maxPassengers: number;
  maxDistance: number;
  minBookingNotice: number;
  cancellationFee: number;
  revenueDriverSplit: number;
  minimumFare: number;
  processingFee: number;
  allowInstantBooking: boolean;
  requirePhoneVerification: boolean;
  enableLocationSharing: boolean;
  showDriverRatings: boolean;
  allowUserFeedback: boolean;
}

export default function SystemConfiguration() {
  const [config, setConfig] = useState({
    // Booking Settings
    bookingTimeout: 30,
    maxPassengers: 4,
    maxDistance: 50,
    minBookingNotice: 15,

    // Payment Settings
    cancellationFee: 5.0,
    revenueDriverSplit: 80,
    minimumFare: 8.5,
    processingFee: 1.5,

    // System Rules
    allowInstantBooking: true,
    requirePhoneVerification: true,
    enableLocationSharing: true,
    showDriverRatings: true,
    allowUserFeedback: true,
  });

  const handleChange = (key: any, value: any) => {
    setConfig({
      ...config,
      [key]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Save configuration:", config);
    alert("Configuration saved successfully!");
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Settings className="h-6 w-6 text-gray-700 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            System Configuration
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Booking Settings */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blue-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Booking Settings
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="bookingTimeout"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Booking Timeout (seconds)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="bookingTimeout"
                      value={config.bookingTimeout}
                      onChange={(e) =>
                        handleChange("bookingTimeout", parseInt(e.target.value))
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="30"
                      min="5"
                      max="300"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">sec</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    How long a driver has to accept a booking request
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="maxPassengers"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Maximum Passengers
                  </label>
                  <input
                    type="number"
                    id="maxPassengers"
                    value={config.maxPassengers}
                    onChange={(e) =>
                      handleChange("maxPassengers", parseInt(e.target.value))
                    }
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-3 sm:text-sm border-gray-300 rounded-md"
                    placeholder="4"
                    min="1"
                    max="10"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum number of passengers per ride
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="maxDistance"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Maximum Ride Distance (miles)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="maxDistance"
                      value={config.maxDistance}
                      onChange={(e) =>
                        handleChange("maxDistance", parseInt(e.target.value))
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="50"
                      min="1"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">mi</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum distance for a single booking
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="minBookingNotice"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minimum Booking Notice (minutes)
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="minBookingNotice"
                      value={config.minBookingNotice}
                      onChange={(e) =>
                        handleChange(
                          "minBookingNotice",
                          parseInt(e.target.value)
                        )
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="15"
                      min="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">min</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    How far in advance bookings must be made
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  Payment Settings
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="cancellationFee"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Cancellation Fee
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="cancellationFee"
                      value={config.cancellationFee}
                      onChange={(e) =>
                        handleChange(
                          "cancellationFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md"
                      placeholder="5.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Fee charged for late cancellations
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="revenueDriverSplit"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Driver Revenue Split
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="number"
                      id="revenueDriverSplit"
                      value={config.revenueDriverSplit}
                      onChange={(e) =>
                        handleChange(
                          "revenueDriverSplit",
                          parseInt(e.target.value)
                        )
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="80"
                      min="1"
                      max="100"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">%</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Percentage of fare given to drivers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="minimumFare"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minimum Fare
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="minimumFare"
                      value={config.minimumFare}
                      onChange={(e) =>
                        handleChange("minimumFare", parseFloat(e.target.value))
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md"
                      placeholder="8.50"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimum price for any ride
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="processingFee"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Processing Fee
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      id="processingFee"
                      value={config.processingFee}
                      onChange={(e) =>
                        handleChange(
                          "processingFee",
                          parseFloat(e.target.value)
                        )
                      }
                      className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-3 sm:text-sm border-gray-300 rounded-md"
                      placeholder="1.50"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Additional fee applied to each booking
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* System Rules */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-purple-500 mr-2" />
                <h2 className="text-lg font-medium text-gray-900">
                  System Rules
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-4">
              {/* Toggle switches for various rules */}
              {[
                {
                  name: "allowInstantBooking",
                  label: "Allow Instant Booking",
                  description:
                    "Enable users to book rides without confirmation",
                },
                {
                  name: "requirePhoneVerification",
                  label: "Require Phone Verification",
                  description:
                    "Require users to verify phone number before booking",
                },
                {
                  name: "enableLocationSharing",
                  label: "Enable Location Sharing",
                  description:
                    "Share driver's real-time location with customers",
                },
                {
                  name: "showDriverRatings",
                  label: "Show Driver Ratings",
                  description: "Allow users to see driver ratings",
                },
                {
                  name: "allowUserFeedback",
                  label: "Allow User Feedback",
                  description: "Allow users to leave feedback after ride",
                },
              ].map(({ name, label, description }) => (
                <div
                  className="flex justify-between items-center py-2"
                  key={name}
                >
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {label}
                    </h3>
                    <p className="text-xs text-gray-500">{description}</p>
                  </div>
                  {/* <button
                    type="button"
                    className={`${
                      config[name] ? "bg-blue-600" : "bg-gray-200"
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    onClick={() => handleChange(name, !config[name])}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        config[name] ? "translate-x-5" : "translate-x-0"
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button> */}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md focus:outline-none"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
