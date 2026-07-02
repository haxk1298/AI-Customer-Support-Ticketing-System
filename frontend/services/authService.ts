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

export const createTicket = async (ticketData: any) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/tickets", ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyTickets = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/tickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const assignTicket = async (ticketId: string) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/tickets/assign/${ticketId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateTicketStatus = async (
  ticketId: string,
  status: string
) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    `/tickets/status/${ticketId}`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};