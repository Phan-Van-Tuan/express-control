import { useQuery } from "@tanstack/react-query";
import { getQueryFn } from "../lib/queryClient";
import { Assignment } from "../types/base";
import { useRouteStore } from "../store/route-store";

export function useAssignmentsQuery() {
  const { assignments } = useRouteStore();

  const { data, isLoading, error, refetch } = useQuery<Assignment[], Error>({
    queryKey: ["/admin/assignments"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  //   // ➕ Tạo hoặc cập nhật assignment
  //   const saveAssignment = async (a: Assignment) => {
  //     const res = await request.post("/admin/assignments/save", a);
  //     if (res.success) {
  //       updateAssignment(res.data);
  //       return true;
  //     }
  //     return false;
  //   };

  //   // ❌ Xoá assignment
  //   const deleteAssignment = async (id: string) => {
  //     const res = await request.delete(`/admin/assignments/${id}`);
  //     if (res.success) {
  //       removeAssignment(id);
  //       return true;
  //     }
  //     return false;
  //   };

  return { assignments, isLoading, error, refetch };
}
