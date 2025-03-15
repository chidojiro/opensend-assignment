import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetLayout } from './types';
import type { RootState } from '@/store';

interface DashboardState {
  layouts?: WidgetLayout;
}

const initialState: DashboardState = {
  layouts: undefined,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<WidgetLayout>) => {
      state.layouts = action.payload;
    },
  },
});

export const { setLayout } = dashboardSlice.actions;

export default dashboardSlice.reducer;

export const selectLayouts = (state: RootState) => state.dashboard.layouts;
