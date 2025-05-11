import { getQueryFn } from "../lib/queryClient";
import { useQuery } from "@tanstack/react-query";
import { useAccountStore } from "../store/account-store";
import { IUser } from "../types/account.types";

export function useAccount() {
  const { accounts, counts, setAccounts } = useAccountStore();

  const { data, isLoading, error, refetch } = useQuery<IUser[], Error>({
    queryKey: ["/admin/account"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

    const getRoute = () => {
      if (data) {
        setAccounts(data);
      }
    };

  //    const saveRoute = async (route: Route) => {
  //     const res = await request.post("/admin/routes/save", route);
  //     if (res.success) {
  //       addRoute(res.data); // res.data là route mới từ server
  //       return true;
  //     }
  //     return false;
  //   };

  //   // ❌ Xoá tuyến đường
  //   const deleteRoute = async (id: string) => {
  //     const res = await request.delete(`/admin/routes/${id}`);
  //     if (res.success) {
  //       removeRoute(id);
  //       return true;
  //     }
  //     return false;
  //   };

  return { accounts, counts, isLoading, error, refetch };
}
