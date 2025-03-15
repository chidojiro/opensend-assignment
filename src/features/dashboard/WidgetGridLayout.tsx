import { Maximize2 } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import {
  WIDGET_GRID_BREAKPOINTS,
  WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  WIDGET_GRID_DEFAULT_GAP,
  WIDGET_GRID_DEFAULT_MIN_SIZE,
} from './constants';
import { Widget, WidgetLayout, WidgetLayoutBreakpoint } from './types';
import { getDefaultLayout, isValidLayout } from './utils';
import { WidgetCard } from './WidgetCard';
import { WidgetGridCells } from './WidgetGridCells';

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
  onDragStart?: () => void;
  onResizeStart?: () => void;
  onDragStop?: () => void;
  onResizeStop?: () => void;
  breakpoint: WidgetLayoutBreakpoint;
};

const WrappedWidgetGridLayout = ({
  widgets,
  layouts: layoutsProp,
  onLayoutChange,
  colsByBreakpoint = WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  gap = WIDGET_GRID_DEFAULT_GAP,
  minSize = WIDGET_GRID_DEFAULT_MIN_SIZE,
  pxPerUnit,
  onDragStart,
  onResizeStart,
  onDragStop,
  onResizeStop,
  breakpoint,
}: WrappedProps) => {
  // Used to preserve aspect ratio when resizing
  const previousPlaceholderLayoutRef = useRef<Layout | null>(null);

  const defaultLayoutsRef = useRef<WidgetLayout>(
    Object.keys(colsByBreakpoint).reduce(
      (acc, breakpoint) => ({
        ...acc,
        [breakpoint]: getDefaultLayout(widgets, {
          minSize,
          breakpoint: breakpoint as WidgetLayoutBreakpoint,
        }),
      }),
      {} as WidgetLayout,
    ),
  );

  const layouts = layoutsProp || defaultLayoutsRef.current;

  const handleResize = (oldLayoutItem: Layout, layoutItem: Layout, placeholder: Layout) => {
    const widget = widgets.find((w) => w.id === layoutItem.i);
    if (!widget?.preserveAspectRatio) return;

    const prevPlaceholder = previousPlaceholderLayoutRef.current;
    const ratio = oldLayoutItem.w / oldLayoutItem.h;

    if (!prevPlaceholder) {
      previousPlaceholderLayoutRef.current = oldLayoutItem;
      return;
    }

    const heightDiff = oldLayoutItem.h - placeholder.h;
    const widthDiff = oldLayoutItem.w - placeholder.w;

    const isResizingWidth = Math.abs(heightDiff) < Math.abs(widthDiff);

    const tempPlaceholder = { ...placeholder };

    if (isResizingWidth) {
      tempPlaceholder.h = placeholder.w / ratio;
    } else {
      tempPlaceholder.w = placeholder.h * ratio;
    }

    const nextPlaceholder = isValidLayout(tempPlaceholder, {
      ratio,
      minSize,
      cols: colsByBreakpoint[breakpoint],
    })
      ? tempPlaceholder
      : prevPlaceholder;

    layoutItem.w = nextPlaceholder.w;
    layoutItem.h = nextPlaceholder.h;
    placeholder.w = nextPlaceholder.w;
    placeholder.h = nextPlaceholder.h;

    previousPlaceholderLayoutRef.current = nextPlaceholder;
  };

  return (
    <>
      <ReactGridLayout
        layouts={layouts}
        onLayoutChange={(_, allLayouts) => {
          onLayoutChange(allLayouts as WidgetLayout);
        }}
        onDragStart={onDragStart}
        onDragStop={onDragStop}
        onResizeStart={onResizeStart}
        onResizeStop={onResizeStop}
        onResize={(_, oldLayoutItem, layoutItem, placeholder) => {
          handleResize(oldLayoutItem, layoutItem, placeholder);
        }}
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
            <WidgetCard widget={widget} breakpoint={breakpoint} />
          </div>
        ))}
      </ReactGridLayout>
    </>
  );
};

type Props = Omit<
  WrappedProps,
  'pxPerUnit' | 'breakpoint' | 'onDragStart' | 'onDragStop' | 'onResizeStart' | 'onResizeStop'
>;

export const WidgetGridLayout = ({
  gap = WIDGET_GRID_DEFAULT_GAP,
  colsByBreakpoint = WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  minSize = WIDGET_GRID_DEFAULT_MIN_SIZE,
  ...restProps
}: Props) => {
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [breakpoint, setBreakpoint] = useState<WidgetLayoutBreakpoint>('lg');
  const [maxY, setMaxY] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const [pxPerUnit, setPxPerUnit] = useState<number>(0);

  const activeCols = colsByBreakpoint[breakpoint];

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const doCalculateSizes = () => {
      if (activeCols) {
        const width = container.clientWidth;
        const totalGap = (activeCols - 1) * gap;
        const pxPerUnit = (width - totalGap) / activeCols;
        setPxPerUnit(pxPerUnit);
        setMaxY(Math.ceil((container.clientHeight || 0) / (pxPerUnit + gap)));
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      doCalculateSizes();
    });

    resizeObserver.observe(container);
    doCalculateSizes();

    return () => {
      resizeObserver.disconnect();
    };
  }, [colsByBreakpoint, gap, activeCols]);

  return (
    <>
      <div className='max-w-full max-h-[80vh] md:max-h-[70vh] overflow-x-hidden overflow-y-scroll px-4'>
        <div className='w-full relative' ref={containerRef}>
          {activeCols && (
            <WidgetGridCells
              isGridVisible={isGridVisible}
              gap={gap}
              activeCols={activeCols}
              maxY={maxY}
              pxPerUnit={pxPerUnit}
            />
          )}
          {!!pxPerUnit && !!breakpoint && (
            <WrappedWidgetGridLayout
              pxPerUnit={pxPerUnit}
              gap={gap}
              colsByBreakpoint={colsByBreakpoint}
              minSize={minSize}
              onDragStart={() => setIsGridVisible(true)}
              onResizeStart={() => setIsGridVisible(true)}
              onDragStop={() => setIsGridVisible(false)}
              onResizeStop={() => setIsGridVisible(false)}
              breakpoint={breakpoint}
              {...restProps}
            />
          )}

          {/* Only used to calculate cols of current breakpoint */}
          <ReactGridLayout
            cols={colsByBreakpoint}
            breakpoints={WIDGET_GRID_BREAKPOINTS}
            onBreakpointChange={(breakpoint) => setBreakpoint(breakpoint as WidgetLayoutBreakpoint)}
          />
        </div>
      </div>
      <div className='w-full border-b border-gray-300 dark:border-gray-700 mt-4'></div>
    </>
  );
};
