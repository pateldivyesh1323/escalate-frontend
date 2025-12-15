import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiService";
import { QUERY_KEYS } from "../constants.ts";

export const useGetUser = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER.GET_USER],
    queryFn: async () => {
      const { data } = await apiClient.get<{ data: User }>(
        "/api/auth/get-user",
      );
      return data.data;
    },
    enabled,
  });
};
