import api from "./api";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = async (userData: RegisterData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData: LoginData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};