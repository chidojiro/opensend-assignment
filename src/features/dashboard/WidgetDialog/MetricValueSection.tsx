import { classNames } from '@/core/utils/string';
import { Folder, MailOpen, MousePointerClick } from 'lucide-react';
import { Widget } from '../types';
import { Card } from '@/core/components/Card';

type Props = {
  className?: string;
  widget: Widget;
};

const LABELS: Record<Widget['type'], string> = {
  IDENTITIES_PROVIDED: 'Identities provided',
  YOTPO_METRIC: 'Clicked',
  ITERABLE_METRIC: 'Opened message',
};

const DESCRIPTIONS: Record<Widget['type'], string> = {
  IDENTITIES_PROVIDED: 'New identities provided during the selected time period.',
  YOTPO_METRIC: 'Number of provided identities who clicked on emails for the selected time period.',
  ITERABLE_METRIC:
    'Number of provided identities who opened emails during the selected time period.',
};

const ICONS: Record<Widget['type'], React.ElementType> = {
  IDENTITIES_PROVIDED: Folder,
  YOTPO_METRIC: MousePointerClick,
  ITERABLE_METRIC: MailOpen,
};

export const MetricValueSection = ({ widget, className }: Props) => {
  const Icon = ICONS[widget.type];

  return (
    <Card className={classNames('h-fit', className)} footer={DESCRIPTIONS[widget.type]}>
      <div className='flex flex-col gap-1'>
        <h3 className='text-gray-500 font-semibold uppercase'>{LABELS[widget.type]}</h3>
        <div className='flex items-center gap-2'>
          <Icon className='shrink-0' />
          <p className='text-2xl font-semibold'>{widget.value}</p>
        </div>
      </div>
    </Card>
  );
};
