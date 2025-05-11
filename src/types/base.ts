export interface Route {
  _id: string;
  name: string; // Ví dụ: Hà Nội - Hải Phòng
  from: GeoJson;
  to: GeoJson;
  distance?: number;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Assignment {
  _id: string;
  routeId: string;
  driverId: string;
  pattern: "even" | "odd" | "daily" | "custom";
  customDays?: string[]; // Nếu pattern = custom: [1, 3, 5, 15]
  startDate: Date; // ngày bắt đầu áp dụng
  endDate?: Date; // (tuỳ chọn) ngày kết thúc
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

export interface GeoJson {
  type:
    | "Feature"
    | "FeatureCollection"
    | "Point"
    | "LineString"
    | "Polygon"
    | "MultiPoint"
    | "MultiLineString"
    | "MultiPolygon";
  geometry: {
    type: "Point" | "LineString" | "Polygon"; // Các loại hình học phổ biến nhất
    coordinates:
      | [number, number] // Point: [longitude, latitude]
      | [number, number][] // LineString: mảng các điểm
      | [number, number][][]; // Polygon: mảng các vòng (ring)
  };
  properties: {
    name?: string; // Tên địa điểm
    address?: string; // Địa chỉ
    city?: string; // Thành phố
    country?: string; // Quốc gia
    postalCode?: string; // Mã bưu điện
    description?: string; // Mô tả thêm
    icon?: string; // URL hoặc tên icon cho bản đồ
    id?: string | number; // ID duy nhất cho feature
    [key: string]: any; // Cho phép mở rộng thuộc tính tùy chỉnh
  };
}
