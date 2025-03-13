import { baseQuery } from '@/features/redux/rtkApis';
import { ApiErrorResponse, ApiResponse } from '@/features/redux/types';
import { createApi, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = {
  view: {
    type: 'ADMIN' | 'CLIENT';
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    clientToken: string;
  };
}

type LoginError = FetchBaseQueryError & {
  data: ApiErrorResponse;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (request) => ({
        url: '/auth/login',
        method: 'POST',
        body: request,
      }),
      transformErrorResponse: (response: LoginError) => {
        return {
          message: response.data.message.replace('Failed to process login ::', ''),
          code: response.data.code,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;


