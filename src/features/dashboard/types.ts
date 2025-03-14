export type Widget = {
  id: string;
  title: string;
  description: string;
  type: 'IDENTITIES_PROVIDED' | 'ITERABLE_METRIC' | 'YOTPO_METRIC';
  value: number;
};
