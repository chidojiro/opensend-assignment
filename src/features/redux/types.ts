export type ApiSuccessResponse<TData> = TData & {
  message: string;
};


export type ApiErrorResponse = {
  message: string;
  code: string;
};

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;