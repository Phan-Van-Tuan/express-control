import { useQuery } from "@tanstack/react-query";
import { useRouteStore } from "../store/route-store";
import { getQueryFn } from "../lib/queryClient";
import { Route } from "../types/base";
import { request } from "../lib/axios-config";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function useRoute() {
  const { routes, setRoutes } = useRouteStore();

  const { data, isLoading, error, refetch } = useQuery<Route[], Error>({
    queryKey: ["/admin/route"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  useEffect(() => {
    if (data) {
      setRoutes(data);
      console.log(data);
    }
  }, [data, setRoutes]);

  const createRoute = async (route: Route) => {
    try {
      const res = await request.post("/admin/route", route);
      if (res) {
        setRoutes([...routes, res as Route]);
        toast.success("Created route successfully!");
        return true;
      }
      return false;
    } catch (error) {
      toast.error("Create route fail!");
      return false;
    }
  };

  //   // ❌ Xoá tuyến đường
  //   const deleteRoute = async (id: string) => {
  //     const res = await request.delete(`/admin/routes/${id}`);
  //     if (res.success) {
  //       removeRoute(id);
  //       return true;
  //     }
  //     return false;
  //   };

  return { routes, isLoading, error, refetch, createRoute };
}
