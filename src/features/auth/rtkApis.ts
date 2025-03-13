import { baseQuery } from '@/features/redux/rtkApis';
import { ApiResponse } from '@/features/redux/types';
import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginError, LoginRequest, LoginResponse, ProfileResponse } from './types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    profile: builder.query<ApiResponse<ProfileResponse>, void>({
      query: () => '/self/profile',
    }),

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

export const { useLoginMutation, useProfileQuery } = authApi;
