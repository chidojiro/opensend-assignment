import { useLayoutEffect, useRef, useState } from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';
import { Widget } from './types';
import { WidgetCard } from './WidgetCard';
import { Maximize2 } from 'lucide-react';

import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const DEFAULT_COLS = 12;
const DEFAULT_GAP = 10;
const DEFAULT_MIN_SIZE = 2;
const DEFAULT_SIZE = 4;

type Props = {
  widgets: Widget[];
  onLayoutChange?: (layout: Layout[]) => void;
  cols?: number;
  gap?: number;
  minSize?: number;
  defaultSize?: number;
};

const WrappedWidgetGridLayout = ({
  widgets,
  onLayoutChange = () => {},
  cols = DEFAULT_COLS,
  gap = DEFAULT_GAP,
  minSize = DEFAULT_MIN_SIZE,
  defaultSize = DEFAULT_SIZE,
  pxPerUnit,
}: Props & { pxPerUnit: number }) => {
  const [layout, setLayout] = useState<RGL.Layout[]>(
    widgets.map((widget, index) => ({
      x: (index * defaultSize) % cols,
      y: Math.floor(index / cols) * pxPerUnit,
      w: defaultSize,
      h: defaultSize,
      i: widget.id,
      minW: minSize,
      minH: minSize,
    })),
  );

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    onLayoutChange(newLayout);
  };

  return (
    <ReactGridLayout
      layout={layout}
      onLayoutChange={handleLayoutChange}
      rowHeight={pxPerUnit}
      cols={cols}
      margin={[gap, gap]}
      resizeHandle={
        <div className='react-resizable-handle absolute bottom-0 right-0 z-10 rotate-90 flex items-center justify-center'>
          <Maximize2 size={10} />
        </div>
      }
    >
      {widgets.map((widget) => (
        <div key={widget.id} className='rounded-xl'>
          <WidgetCard widget={widget} />
        </div>
      ))}
    </ReactGridLayout>
  );
};

export const WidgetGridLayout = ({
  gap = DEFAULT_GAP,
  cols = DEFAULT_COLS,
  minSize = DEFAULT_MIN_SIZE,
  ...restProps
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<number>();

  useLayoutEffect(() => {
    const doCalculateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;

        const totalMarginX = gap * 2;
        const totalGap = (cols - 1) * gap;

        const size = (width - totalGap - totalMarginX) / cols;

        setSize(size);
      }
    };

    doCalculateSize();

    window.addEventListener('resize', doCalculateSize);

    return () => {
      window.removeEventListener('resize', doCalculateSize);
    };
  }, [cols, gap]);

  return (
    <div ref={containerRef}>
      {!!size && (
        <WrappedWidgetGridLayout
          pxPerUnit={size}
          gap={gap}
          cols={cols}
          minSize={minSize}
          {...restProps}
        />
      )}
    </div>
  );
};
