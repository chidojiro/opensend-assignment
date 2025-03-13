import { baseQuery } from '@/features/redux/rtkApis';
import { createApi } from '@reduxjs/toolkit/query/react';
import { StoreResponse } from './types';

export const storeApi = createApi({
  reducerPath: 'storeApi',
  baseQuery,
  endpoints: (builder) => ({
    store: builder.query<StoreResponse, number>({
      query: (id) => `/store/${id}`,
    }),
  }),
});

export const { useStoreQuery } = storeApi;
