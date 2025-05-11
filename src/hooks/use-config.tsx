import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";
import { AppConfig, useConfigStore } from "../store/config-store";
import { request } from "../lib/axios-config";
import { toast } from "react-toastify";

export function useConfig() {
  const { setConfig } = useConfigStore();

  const { data, isLoading, error, refetch } = useQuery<AppConfig[], Error>({
    queryKey: ["/admin/configs"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  useEffect(() => {
    if (data) {
      setConfig(data);
    }
  }, [data, setConfig]);

  const updateConfig = async (updated: AppConfig) => {
    try {
      const res = await request.post("/admin/configs/update", updated);
      if (res) {
        const a = data?.map((cfg) =>
          cfg._id === updated._id ? updated : cfg
        ) as AppConfig[];
        setConfig(a);
        toast.success("Success");
        return true;
      }
      toast.success("Fail");
      return false;
    } catch (error) {
      toast.error(error + "");
      return false;
    }
  };

  return {
    configs: useConfigStore((s) => s.configs),
    isLoading,
    error,
    // loadConfig,
    updateConfig,
    refetch,
  };
}
