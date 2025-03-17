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

const getGreatestCommonDivisor = (w: number, h: number) => {
  let tempW = w;
  let tempH = h;

  while (tempH !== 0) {
    const temp = tempH;
    tempH = tempW % tempH;
    tempW = temp;
  }

  return tempW;
};

export const getMinSize = ({ w, h, minSize }: { w: number; h: number; minSize: number }) => {
  const gcdValue = getGreatestCommonDivisor(w, h);
  const wPrime = w / gcdValue;
  const hPrime = h / gcdValue;
  const k = wPrime < minSize || hPrime < minSize ? minSize : 1;

  return { w: wPrime * k, h: hPrime * k };
};
