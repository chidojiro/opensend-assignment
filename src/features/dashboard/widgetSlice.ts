import { RootState } from '@/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget } from './types';

const MOCK_WIDGETS: Widget[] = [
  {
    id: '1',
    title: 'Identities Provided',
    description: 'New identities provided during the selected time period.',
    type: 'IDENTITIES_PROVIDED',
    value: 0,
    defaultSize: {
      lg: '12x4',
      md: '12x4', 
      sm: '8x4',
      xs: '4x4',
      xxs: '2x2',
    },
    preserveAspectRatio: true,
  },
  {
    id: '2',
    title: 'Clicked',
    description:
      'Number of provided identities who clicked on emails for the selected time period.',
    type: 'ITERABLE_METRIC',
    value: 0,
    defaultSize: {
      lg: '4x2',
      md: '4x2',
      sm: '4x2', 
      xs: '2x2',
      xxs: '2x2',
    },
  },
  {
    id: '3',
    title: 'Opened message',
    description: 'Number of provided identities who opened emails during the selected time period.',
    type: 'YOTPO_METRIC',
    value: 0,
    defaultSize: {
      lg: '3x3',
      md: '3x3',
      sm: '4x4',
      xs: '2x2',
      xxs: '2x2',
    },
    preserveAspectRatio: true,
  },
];

interface WidgetState {
  widgets: Widget[];
}

const initialState: WidgetState = {
  widgets: MOCK_WIDGETS,
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
