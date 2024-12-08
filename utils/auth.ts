import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);

    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
