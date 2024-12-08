import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  email: string;
  password: string;
  name: string;
  role: string;
}

interface LoginResponse {
  token: string;
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axiosClient.post("/api/user/login", credentials);
  return response.data;
};

const signup = async (
  credentials: SignupCredentials
): Promise<LoginResponse> => {
  const response = await axiosClient.post("/api/user/signup", credentials);
  return response.data;
};

export const useAuth = (): UseMutationResult<
  LoginResponse,
  any,
  LoginCredentials,
  unknown
> & { isLoading: boolean } => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Login error:", error.response?.data || error.message);
    },
  });

  const isLoading = mutation.status === "pending";

  return { ...mutation, isLoading };
};

export const useRegisterAuth = (): UseMutationResult<
  LoginResponse,
  any,
  SignupCredentials,
  unknown
> & { isLoading: boolean } => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/");
    },
    onError: (error: any) => {
      console.error("Signup error:", error.response?.data || error.message);
    },
  });

  const isLoading = mutation.status === "pending";

  return { ...mutation, isLoading };
};
