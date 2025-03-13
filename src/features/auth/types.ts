import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ApiErrorResponse } from '@/features/redux/types';

export type View = {
  type: 'ADMIN' | 'CLIENT';
  accesses: { store_id: number }[];
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  view: View;
  tokens: {
    accessToken: string;
    refreshToken: string;
    clientToken: string;
  };
};

export type LoginError = FetchBaseQueryError & {
  data: ApiErrorResponse;
};

export type ProfileResponse = {
  view: View;
};
