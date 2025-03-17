import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget } from './types';
import defaultWidgets from './defaultWidgets.json';

interface WidgetState {
  widgets: Widget[];
}

const initialState: WidgetState = {
  widgets: defaultWidgets as Widget[],
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    updateWidget: (state, action: PayloadAction<Widget>) => {
      const index = state.widgets.findIndex((widget) => widget.id === action.payload.id);
      if (index !== -1) {
        state.widgets[index] = action.payload;
      }
    },
  },
});

export const { updateWidget } = widgetSlice.actions;

export default widgetSlice.reducer;

export const selectWidgets = (state: RootState) => state.widgets.widgets;
