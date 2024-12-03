import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface HttpClient extends AxiosInstance {
  get<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T>;
}

export interface DaengleError {
  status: number;
  code: number;
  message: string;
}

export interface DaengleErrorResponse extends AxiosError<DaengleError> {
  response: AxiosResponse<DaengleError>;
}

export interface DaengleResponse<T> {
  success: boolean;
  response: T | null;
  error: DaengleErrorResponse | null;
}
