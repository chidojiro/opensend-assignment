import { Layout } from 'react-grid-layout';

export type Widget = {
  id: string;
  title: string;
  description: string;
  type: 'IDENTITIES_PROVIDED' | 'ITERABLE_METRIC' | 'YOTPO_METRIC';
  value: number;
  preserveAspectRatio?: boolean;
};

export type WidgetLayoutBreakpoint = 'md' | 'sm' | 'xs' | 'xxs';

export type WidgetLayout = Record<WidgetLayoutBreakpoint, Layout[]>;
