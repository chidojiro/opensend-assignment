import { useLayoutEffect, useRef, useState } from 'react';
import {
  WIDGET_GRID_BREAKPOINTS,
  WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  WIDGET_GRID_DEFAULT_GAP,
  WIDGET_GRID_DEFAULT_MIN_SIZE,
} from '../constants';
import { WidgetLayoutBreakpoint } from '../types';
import { WidgetGridCells } from './WidgetGridCells';
import { WidgetGridLayout } from './WidgetGridLayout';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ReactGridLayout = WidthProvider(Responsive);

type Props = Omit<
  React.ComponentProps<typeof WidgetGridLayout>,
  'pxPerUnit' | 'breakpoint' | 'onDragStart' | 'onDragStop' | 'onResizeStart' | 'onResizeStop'
>;

export const ResponsiveWidgetGridLayout = ({
  gap = WIDGET_GRID_DEFAULT_GAP,
  colsByBreakpoint = WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  minSize = WIDGET_GRID_DEFAULT_MIN_SIZE,
  ...restProps
}: Props) => {
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [breakpoint, setBreakpoint] = useState<WidgetLayoutBreakpoint>('lg');
  const [maxY, setMaxY] = useState<number>(0);
  const [pxPerUnit, setPxPerUnit] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const activeCols = colsByBreakpoint[breakpoint];

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const doCalculateSizes = () => {
      if (activeCols) {
        const width = container.clientWidth;
        const totalGap = (activeCols - 1) * gap;
        const pxPerUnit = Math.floor((width - totalGap) / activeCols);
        setPxPerUnit(pxPerUnit);

        const containerHeight = container.clientHeight || 0;
        const rowHeightWithGap = pxPerUnit + gap;
        const maxY = Math.max(
          Math.ceil(containerHeight / rowHeightWithGap),
          1, // Ensure at least 1 row
        );
        setMaxY(maxY);
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
    <div className='flex-1 px-4'>
      <div className='w-full relative' ref={containerRef}>
        <WidgetGridCells
          isGridVisible={isGridVisible}
          gap={gap}
          activeCols={activeCols}
          maxY={maxY}
          pxPerUnit={pxPerUnit}
        />
        {!!pxPerUnit && (
          <WidgetGridLayout
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

        {/* Only used to get breakpoint w */}
        <ReactGridLayout
          cols={colsByBreakpoint}
          breakpoints={WIDGET_GRID_BREAKPOINTS}
          onBreakpointChange={(breakpoint) => setBreakpoint(breakpoint as WidgetLayoutBreakpoint)}
        />
      </div>
    </div>
  );
};
