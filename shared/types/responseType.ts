export interface ApiResponseOptions<T = any> {
  data?: T;
  message: string | Error;
  statusCode: number;
  success: boolean;
}
