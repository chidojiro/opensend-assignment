export type ApiResponse<TData> = TData & {
  message: string;
};

export type ApiErrorResponse = {
  message: string;
  code: string;
};
