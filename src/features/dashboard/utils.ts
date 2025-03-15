import { Layout } from "react-grid-layout";
import { Widget } from "./types";

export const getDefaultLayout = (widgets: Widget[], { minSize }: { minSize: number }) => {
  const layout: Layout[] = [];

  let currentY = 0;

  widgets.forEach((widget) => {
    const [width, height] = widget.defaultSize.split('x').map(Number);

    currentY += height;

    layout.push({
      x: 0,
      y: currentY,
      w: width,
      h: height,
      i: widget.id,
      minW: minSize,
      minH: minSize,
    });
  });

  return layout;
};

export const isValidLayout = (layout: Layout, { ratio, minSize, cols }: { ratio: number; minSize: number; cols: number }) => {
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
