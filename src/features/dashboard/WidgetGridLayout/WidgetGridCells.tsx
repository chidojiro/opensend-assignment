import { classNames } from '@/core/utils/string';
import { range } from 'lodash-es';

type Props = {
  isGridVisible: boolean;
  gap: number;
  activeCols: number;
  maxY: number;
  pxPerUnit: number;
};

export const WidgetGridCells = ({ isGridVisible, gap, activeCols, maxY, pxPerUnit }: Props) => {
  return (
    <div
      className={classNames(
        'absolute inset-0 z-0 transition-opacity',
        isGridVisible ? 'opacity-100 duration-500' : 'opacity-0',
      )}
    >
      <div
        className='relative z-10 flex flex-wrap items-start shrink-0 w-full h-fit overflow-hidden'
        style={{ gap }}
      >
        {range(activeCols * maxY).map((i) => (
          <div
            key={i}
            className='bg-gray-200/40 dark:bg-gray-700/40 shrink-0'
            style={{ height: pxPerUnit, width: pxPerUnit }}
          />
        ))}
      </div>
    </div>
  );
};
