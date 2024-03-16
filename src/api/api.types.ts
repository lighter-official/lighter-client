export type SuccessResponse<T> = {
  code: "OK";
  data: T;
  message: string;
  success: true;
};

export type ErrorResponse<E = void> = {
  code: string;
  data: null | E;
  message: string;
  success: false;
};

export type Response<T, E = void> = SuccessResponse<T> | ErrorResponse<E>;
