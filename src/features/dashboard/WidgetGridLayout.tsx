import { Maximize2 } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  WIDGET_GRID_BREAKPOINTS,
  WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  WIDGET_GRID_DEFAULT_GAP,
  WIDGET_GRID_DEFAULT_MIN_SIZE,
  WIDGET_GRID_DEFAULT_SIZE,
} from './constants';
import { Widget, WidgetLayout } from './types';
import { WidgetCard } from './WidgetCard';

import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(Responsive);

type WrappedProps = {
  widgets: Widget[];
  onLayoutChange: (layouts: WidgetLayout) => void;
  pxPerUnit: number;
  layouts?: WidgetLayout;
  colsByBreakpoint?: typeof WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT;
  gap?: number;
  minSize?: number;
  defaultSize?: number;
};

const getDefaultLayout = (
  widgets: Widget[],
  { cols, minSize, defaultSize }: { cols: number; minSize: number; defaultSize: number },
) => {
  return widgets.map((widget, index) => ({
    x: (index * defaultSize) % cols,
    y: Math.floor(index / cols) * defaultSize,
    w: defaultSize,
    h: defaultSize,
    i: widget.id,
    minW: minSize,
    minH: minSize,
  }));
};

const WrappedWidgetGridLayout = ({
  widgets,
  layouts: layoutsProp,
  onLayoutChange,
  colsByBreakpoint = WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  gap = WIDGET_GRID_DEFAULT_GAP,
  minSize = WIDGET_GRID_DEFAULT_MIN_SIZE,
  defaultSize = WIDGET_GRID_DEFAULT_SIZE,
  pxPerUnit,
}: WrappedProps) => {
  const defaultLayoutsRef = useRef<WidgetLayout>(
    Object.fromEntries(
      Object.entries(colsByBreakpoint).map(([breakpoint, cols]) => [
        breakpoint,
        getDefaultLayout(widgets, { cols, minSize, defaultSize }),
      ]),
    ) as WidgetLayout,
  );

  const layouts = layoutsProp || defaultLayoutsRef.current;

  return (
    <ReactGridLayout
      layouts={layouts}
      onLayoutChange={(_, allLayouts) => onLayoutChange(allLayouts as WidgetLayout)}
      rowHeight={pxPerUnit}
      cols={colsByBreakpoint}
      margin={[gap, gap]}
      breakpoints={WIDGET_GRID_BREAKPOINTS}
      resizeHandle={
        <div className='react-resizable-handle absolute bottom-0 right-0 z-10 rotate-90 flex items-center justify-center'>
          <Maximize2 size={10} />
        </div>
      }
      containerPadding={[0, 0]}
    >
      {widgets.map((widget) => (
        <div key={widget.id} className='rounded-xl'>
          <WidgetCard widget={widget} />
        </div>
      ))}
    </ReactGridLayout>
  );
};

type Props = Omit<WrappedProps, 'onBreakpointChange' | 'pxPerUnit'>;

export const WidgetGridLayout = ({
  gap = WIDGET_GRID_DEFAULT_GAP,
  colsByBreakpoint = WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  minSize = WIDGET_GRID_DEFAULT_MIN_SIZE,
  ...restProps
}: Props) => {
  const [activeCols, setActiveCols] = useState<number>();

  const containerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState<number>(0);

  useLayoutEffect(() => {
    const doCalculateSize = () => {
      if (containerRef.current && activeCols) {
        const width = containerRef.current.clientWidth;

        const totalGap = (activeCols - 1) * gap;

        const size = (width - totalGap) / activeCols;

        setSize(size);
      }
    };

    doCalculateSize();

    window.addEventListener('resize', doCalculateSize);

    return () => {
      window.removeEventListener('resize', doCalculateSize);
    };
  }, [colsByBreakpoint, gap, activeCols]);

  return (
    <div ref={containerRef}>
      {!!size && (
        <WrappedWidgetGridLayout
          pxPerUnit={size}
          gap={gap}
          colsByBreakpoint={colsByBreakpoint}
          minSize={minSize}
          {...restProps}
        />
      )}

      {/* Only used to calculate cols of current breakpoint */}
      <ReactGridLayout
        cols={colsByBreakpoint}
        breakpoints={WIDGET_GRID_BREAKPOINTS}
        onBreakpointChange={(_, cols) => setActiveCols(cols)}
      />
    </div>
  );
};
