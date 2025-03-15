import { Layout } from 'react-grid-layout';

export type Widget = {
  id: string;
  title: string;
  description: string;
  type: 'IDENTITIES_PROVIDED' | 'ITERABLE_METRIC' | 'YOTPO_METRIC';
  value: number;
  // width x height
  defaultSize: `${number}x${number}`;
  preserveAspectRatio?: boolean;
};

export type WidgetLayoutBreakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export type WidgetLayout = Record<WidgetLayoutBreakpoint, Layout[]>;
