import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.clear();
    router.push('/login');
  };

  return logout;
};
