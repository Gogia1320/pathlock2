import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  nameid: string; // User ID
  unique_name: string; // Username
  exp: number; // Expiration time
}

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('token');
};

export const getUserIdFromToken = (): number | null => {
  const token = getToken();
  if (token) {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      return parseInt(decoded.nameid);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }
  return null;
};

export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) {
    return true; // No token, considered expired
  }
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Invalid token, considered expired
  }
};
