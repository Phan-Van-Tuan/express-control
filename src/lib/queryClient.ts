import { QueryClient, QueryFunction } from "@tanstack/react-query";
import api from "./axios-config";
import { AxiosError } from "axios";

// Cấu hình React Query sử dụng axios
type UnauthorizedBehavior = "returnNull" | "throw";

export function getQueryFn<T>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> {
  return async ({ queryKey }) => {
    try {
      const response = await api.get<T>(queryKey[0] as string);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (
        options.on401 === "returnNull" &&
        axiosError.response?.status === 401
      ) {
        return null as T;
      }

      throw error;
    }
  };
}

// MutationFn cho React Query
export const mutationFn = async <T, D = any>(
  url: string,
  data?: D,
  method: "post" | "put" | "delete" = "post"
): Promise<T> => {
  const response = await api[method]<T>(url, data);
  return response.data;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default api;
