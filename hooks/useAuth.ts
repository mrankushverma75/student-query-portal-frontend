import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosClient from '@/lib/axiosClient';
import { useRouter } from 'next/navigation';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
    email: string;
    password: string;
    mobile: string;
  }

interface LoginResponse {
  token: string;
}

const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await axiosClient.post('/auth/login', credentials);
  return response.data;
};

const signup = async (credentials: SignupCredentials): Promise<LoginResponse> => {
    const response = await axiosClient.post('/auth/signup', credentials);
    return response.data;
  };

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);

      queryClient.invalidateQueries(['user']);

      router.push('/');
    },
    onError: (error: any) => {
      console.error('Login error:', error.response?.data || error.message);
    },
  });

  return mutation;
};

export const useRegisterAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
  
    const mutation = useMutation({
      mutationFn: signup,
      onSuccess: (data) => {
        localStorage.setItem('token', data.token);

        queryClient.invalidateQueries(['user']);
  
        router.push('/');
      },
      onError: (error: any) => {
        console.error('Signup error:', error.response?.data || error.message);
      },
    });
  
    return mutation;
  };
  