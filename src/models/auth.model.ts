export interface AuthenticationInput {
  email: string,
  password: string
}

export interface LoginResponse {
  id: string;
  type: string;
  token: string;
}
