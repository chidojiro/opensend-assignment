import { Maximize2 } from 'lucide-react';
import { useRef } from 'react';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import {
  WIDGET_GRID_BREAKPOINTS,
  WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT,
  WIDGET_GRID_DEFAULT_GAP,
  WIDGET_GRID_DEFAULT_MIN_SIZE,
} from '../constants';
import { Widget, WidgetLayout, WidgetLayoutBreakpoint } from '../types';
import { isValidLayout } from '../utils';
import { WidgetCard } from './WidgetCard';

import 'react-grid-layout/css/styles.css';

const ReactGridLayout = WidthProvider(Responsive);

type Props = {
  widgets: Widget[];
  onLayoutChange: (layouts: WidgetLayout) => void;
  pxPerUnit: number;
  layouts: WidgetLayout;
  colsByBreakpoint?: typeof WIDGET_GRID_DEFAULT_COLS_BY_BREAKPOINT;
  gap?: number;
  minSize?: number;

  onDragStart?: () => void;
  onResizeStart?: () => void;
  onDragStop?: () => void;
  onResizeStop?: () => void;
  breakpoint: WidgetLayoutBreakpoint;
};

export const WidgetGridLayout = ({
  widgets,
  layouts,
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
}: Props) => {
  // Used to preserve aspect ratio when resizing
  const previousPlaceholderLayoutRef = useRef<Layout | null>(null);

  const handleResize = (oldLayoutItem: Layout, layoutItem: Layout, placeholder: Layout) => {
    const widget = widgets.find((w) => w.id === layoutItem.i);
    if (!widget?.preserveAspectRatio) return;

    const previousPlaceholder = previousPlaceholderLayoutRef.current;
    const ratio = oldLayoutItem.w / oldLayoutItem.h;

    if (!previousPlaceholder) {
      previousPlaceholderLayoutRef.current = oldLayoutItem;
      return;
    }

    const isWidthResizeHeavier = placeholder.w / placeholder.h > ratio;

    const tempPlaceholder = { ...placeholder };

    if (isWidthResizeHeavier) {
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
      : previousPlaceholder;

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
            <WidgetCard widget={widget} />
          </div>
        ))}
      </ReactGridLayout>
    </>
  );
};
