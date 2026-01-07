export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  type: "guest" | "registered";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  customer: Customer;
}

export interface RefreshResponse {
  message: string;
}

export interface LogoutResponse {
  message: string;
}

