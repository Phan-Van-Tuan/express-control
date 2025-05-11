import { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface Province {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}

const AddressSelector = ({
  title,
  onResult,
}: {
  title: string;
  onResult: (val: any) => void;
}) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const selectedProvinceData = provinces.find(
        (p) => p.Id === selectedProvince
      );
      setDistricts(selectedProvinceData?.Districts || []);
      setSelectedDistrict("");
      setWards([]);
      setSelectedWard("");
    }
  }, [selectedProvince, provinces]);

  useEffect(() => {
    if (selectedDistrict) {
      const selectedDistrictData = districts.find(
        (d) => d.Id === selectedDistrict
      );
      setWards(selectedDistrictData?.Wards || []);
      setSelectedWard("");
      handleAddressChange();
    }
  }, [selectedDistrict, districts]);

  const handleAddressChange = useCallback(() => {
    if (selectedProvince && selectedDistrict && selectedWard) {
      onResult({ selectedProvince, selectedDistrict, selectedWard });
    } // xử lý dữ liệu ở cha
  }, []);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      <div className="space-y-4">
        <select
          id="province"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province.Id} value={province.Id}>
              {province.Name}
            </option>
          ))}
        </select>

        <select
          id="district"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedProvince}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
            !selectedProvince ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.Id} value={district.Id}>
              {district.Name}
            </option>
          ))}
        </select>

        <select
          id="ward"
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          disabled={!selectedDistrict}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
            !selectedDistrict ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          <option value="">Select Ward</option>
          {wards.map((ward) => (
            <option key={ward.Id} value={ward.Id}>
              {ward.Name}
            </option>
          ))}
        </select>
      </div>

      {selectedProvince && selectedDistrict && selectedWard && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h3 className="font-medium text-blue-800">Địa chỉ đã chọn:</h3>
          <p className="text-blue-600">
            {wards.find((w) => w.Id === selectedWard)?.Name},{" "}
            {districts.find((d) => d.Id === selectedDistrict)?.Name},{" "}
            {provinces.find((p) => p.Id === selectedProvince)?.Name}
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;
