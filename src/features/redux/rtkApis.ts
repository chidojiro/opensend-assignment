import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAccessToken, getClientToken } from '@/features/auth/utils';

export const baseQuery = fetchBaseQuery({
  // NOTE: This is should be from .env in real project
  baseUrl: 'https://stgapp-bwgkn3md.opensend.com',
  prepareHeaders: (headers) => {
    const token = getAccessToken();
    const clientToken = getClientToken();

    if (token) {
      headers.set('Access-Token', `Bearer ${token}`);
    }

    if (clientToken) {
      headers.set('Client-Token', clientToken);
    }

    return headers;
  },
});
