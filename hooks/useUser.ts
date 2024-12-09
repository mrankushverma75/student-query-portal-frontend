import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { isTokenValid } from "@/utils/auth";

interface DecodedToken {
  id: string,
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

const fetchUser = async (): Promise<DecodedToken> => {
  const token = localStorage.getItem("token");

  if (!token || !isTokenValid(token)) {
    throw new Error("Invalid or expired token");
  }

  const decoded: DecodedToken = jwtDecode(token);

  return decoded;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
  });
};
