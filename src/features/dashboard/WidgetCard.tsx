import { Widget } from './types';
import { WidgetCardContainer } from './WidgetCardContainer';

type Props = {
  className?: string;
  widget: Widget;
};

export const WidgetCard = ({ widget, ...restProps }: Props) => {
  return (
    <>
      <WidgetCardContainer widget={widget} {...restProps}>
        <h3 className='text-xl md:text-2xl font-medium text-center'>{widget.title}</h3>
        <p className='text-gray-500 text-center'>{widget.description}</p>
      </WidgetCardContainer>
    </>
  );
};
WidgetCard.displayName = 'WidgetCard';
