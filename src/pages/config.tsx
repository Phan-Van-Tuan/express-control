import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useConfig } from "../hooks/use-config";
import { AppConfig } from "../store/config-store";
import { Edit, Info } from "lucide-react";
import { cn, formatCurrency } from "../lib/utils";
import { motion } from "framer-motion";
import Modal from "../components/base/Modal";

export default function ConfigPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedValue, setEditedValue] = useState<AppConfig | null>(null);

  const { configs, isLoading, updateConfig, error, refetch } = useConfig();

  const handleEdit = (config: AppConfig) => {
    setEditingId(config._id);
    setEditedValue(config); // hoặc transform nếu là số
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedValue(null);
  };

  const handleSave = async () => {
    if (editingId && editedValue !== null) {
      await updateConfig(editedValue);
      setEditingId(null);
      setEditedValue(null);
    }
  };
  const navigate = useNavigate();

  const getConfigLabel = (type: AppConfig["type"]) => {
    switch (type) {
      case "standard_price":
        return "Standard Price";
      case "min_price":
        return "Minimum Price";
      case "app_fee":
        return "Application Fee";
      case "tax":
        return "Tax Rate";
      default:
        return type;
    }
  };

  const getValueSuffix = (value: number, type: AppConfig["type"]) => {
    switch (type) {
      case "standard_price":
      case "min_price":
        return formatCurrency(value);
      case "app_fee":
      case "tax":
        return `${value * 100} %`;
      default:
        return "0";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p>Loading configurations...</p>
      </div>
    );
  }

  return (
    <main className="p-4 flex-1 text-zinc-800 dark:text-zinc-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Configuration</h1>
        <Button onClick={() => navigate(-1)} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {!isLoading && error && (
          <div className="flex">
            <p className="text-red-500">{error.message}, </p>
            <p className="text-blue-500" onClick={() => refetch()}>
              Try again
            </p>
          </div>
        )}
        {configs &&
          configs.map((config) => {
            return (
              <Card key={config._id} className={"rounded-3xl"}>
                <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="text-lg font-semibold mb-1">
                    {getConfigLabel(config.type)}
                  </h3>
                  <button
                    onClick={() => handleEdit(config)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <Edit className="w-5 h-5 text-blue-600" />
                  </button>
                </div>
                <motion.div
                  animate={{ rotateX: 0, transition: { duration: 0.5 } }}
                >
                  <p className="text-gray-500 dark:text-gray-400">Config</p>
                  <p className="text-3xl font-semibold mb-4">
                    {getValueSuffix(config.value, config.type) ||
                      "Not info yet!"}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Description
                  </p>
                  <p className="mb-4">{config.info || "Not info yet!"}</p>
                  <p className="text-gray-500 dark:text-gray-400">Condition</p>
                  <p className="mb-4">
                    {config.condition || "Not condition yet!"}
                  </p>
                </motion.div>
              </Card>
            );
          })}
      </div>
      {editingId && editedValue && (
        <Modal isOpen={true} onClose={handleCancel} size="lg" type="custom">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Info className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-semibold">
                Update {getConfigLabel(editedValue.type)}
              </h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">Config</p>
              <Input
                type="number"
                step={editedValue.type.includes("price") ? "10" : "0.01"}
                min="0"
                value={editedValue.value}
                onChange={(e) =>
                  setEditedValue({
                    ...editedValue,
                    value: Number(e.target.value),
                  } as AppConfig)
                }
                className="w-full text-3xl font-semibold"
              />
              <p className="text-gray-500 dark:text-gray-400">Description</p>
              <Input
                value={editedValue.info}
                onChange={(e) =>
                  setEditedValue({
                    ...editedValue,
                    info: e.target.value,
                  } as AppConfig)
                }
                className="w-full"
              />
              <p className="text-gray-500 dark:text-gray-400">Condition</p>
              <Input
                value={editedValue.condition}
                onChange={(e) =>
                  setEditedValue({
                    ...editedValue,
                    condition: e.target.value,
                  } as AppConfig)
                }
                className="w-full"
              />
              <div className="flex justify-end gap-3 mt-6">
                <button
                  className="px-4 py-2 text-sm border rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </main>
  );
}
