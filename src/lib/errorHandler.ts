import { toast } from "react-toastify";

// Định nghĩa kiểu cho cấu hình plugin
interface ErrorHandlerConfig {
  showToast?: boolean;
  logToConsole?: boolean;
  customDisplay?: ((error: CategorizedError) => void) | null;
}

// Định nghĩa kiểu cho lỗi đã phân loại
interface CategorizedError {
  type: "API_ERROR" | "NETWORK_ERROR" | "RUNTIME_ERROR" | "UNKNOWN_ERROR";
  message: string;
  status?: number; // Chỉ có với API_ERROR
  details?: any; // Thông tin bổ sung, có thể là object hoặc undefined
}

// Định nghĩa kiểu cho lỗi từ axios (nếu dùng axios)
interface AxiosError extends Error {
  response?: {
    status: number;
    data: any;
  };
  request?: any;
}

// Cấu hình mặc định
const defaultConfig: ErrorHandlerConfig = {
  showToast: true,
  logToConsole: true,
  customDisplay: null,
};

class ErrorHandler {
  private config: ErrorHandlerConfig;

  constructor(config: ErrorHandlerConfig = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  // Hàm phân loại lỗi với TypeScript
  categorizeError(error: unknown): CategorizedError {
    if (this.isAxiosError(error)) {
      // Lỗi từ API (có response)
      const status = error.response?.status;
      const message =
        error.response?.data?.message || "Lỗi không xác định từ server";
      return {
        type: "API_ERROR",
        status,
        message,
        details: error.response?.data,
      };
    } else if (this.isNetworkError(error)) {
      // Lỗi mạng (không có response)
      return {
        type: "NETWORK_ERROR",
        message: "Không thể kết nối đến server",
      };
    } else if (error instanceof TypeError || error instanceof ReferenceError) {
      // Lỗi runtime
      return {
        type: "RUNTIME_ERROR",
        message: error.message,
      };
    } else {
      // Lỗi khác (custom hoặc không xác định)
      const message =
        error instanceof Error ? error.message : "Lỗi không xác định";
      return {
        type: "UNKNOWN_ERROR",
        message,
        details:
          error instanceof Error && "details" in error
            ? (error as any).details
            : undefined,
      };
    }
  }

  // Type guard để kiểm tra lỗi axios
  private isAxiosError(error: unknown): error is AxiosError {
    return (
      (error as AxiosError).response !== undefined ||
      (error as AxiosError).request !== undefined
    );
  }

  // Type guard để kiểm tra lỗi mạng
  private isNetworkError(error: unknown): error is AxiosError {
    return (
      (error as AxiosError).request !== undefined &&
      (error as AxiosError).response === undefined
    );
  }

  // Hàm xử lý lỗi
  handleError(error: unknown, showToast = true): CategorizedError {
    const categorizedError = this.categorizeError(error);

    // if (this.config.logToConsole) {
    //   console.error(
    //     `[${categorizedError.type}] ${categorizedError.message}`,
    //     categorizedError.details || ""
    //   );
    // }

    // if (this.config.showToast && showToast) {
    //   toast.error(categorizedError.message);
    // }

    // if (this.config.customDisplay) {
    //   this.config.customDisplay(categorizedError);
    // }

    return categorizedError;
  }

  // Hàm xử lý lỗi không đồng bộ
  async handleAsyncError<T>(
    promise: Promise<T>
  ): Promise<T | CategorizedError> {
    try {
      const result = await promise;
      return result;
    } catch (error) {
      return this.handleError(error);
    }
  }
}

export default ErrorHandler;
