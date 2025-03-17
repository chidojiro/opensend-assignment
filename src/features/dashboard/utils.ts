import { Layout } from 'react-grid-layout';

export const isValidLayout = (
  layout: Layout,
  { ratio, minSize, cols }: { ratio: number; minSize: number; cols: number },
) => {
  if (!Number.isInteger(layout.w) || !Number.isInteger(layout.h)) {
    return false;
  }

  if (layout.w < minSize || layout.h < minSize) {
    return false;
  }

  if (layout.w > cols) {
    return false;
  }

  if (layout.w !== layout.h * ratio) return false;

  return true;
};
