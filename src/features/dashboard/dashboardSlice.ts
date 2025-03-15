import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget, WidgetLayout } from './types';
import type { RootState } from '@/store';

const MOCK_WIDGETS: Widget[] = [
  {
    id: '1',
    title: 'Identities Provided',
    description: 'New identities provided during the selected time period.',
    type: 'IDENTITIES_PROVIDED',
    value: 0,
  },
  {
    id: '2',
    title: 'Clicked',
    description:
      'Number of provided identities who clicked on emails for the selected time period.',
    type: 'ITERABLE_METRIC',
    value: 0,
  },
  {
    id: '3',
    title: 'Opened message',
    description: 'Number of provided identities who opened emails during the selected time period.',
    type: 'YOTPO_METRIC',
    value: 0,
  },
];

interface DashboardState {
  widgets: Widget[];
  layouts?: WidgetLayout;
}

const initialState: DashboardState = {
  widgets: MOCK_WIDGETS,
  layouts: undefined,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    updateWidget: (state, action: PayloadAction<Widget>) => {
      const index = state.widgets.findIndex((widget) => widget.id === action.payload.id);
      if (index !== -1) {
        state.widgets[index] = action.payload;
      }
    },
    setLayout: (state, action: PayloadAction<WidgetLayout>) => {
      state.layouts = action.payload;
    },
  },
});

export const { updateWidget, setLayout } = dashboardSlice.actions;

export default dashboardSlice.reducer;

export const selectWidgets = (state: RootState) => state.dashboard.widgets;
export const selectLayouts = (state: RootState) => state.dashboard.layouts;
