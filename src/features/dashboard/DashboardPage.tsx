import { useDispatch, useSelector } from 'react-redux';
import { WidgetGridLayout } from './WidgetGridLayout';
import { selectLayout, selectWidgets, setLayout } from './dashboardSlice';

export default function DashboardPage() {
  const widgets = useSelector(selectWidgets);
  const layout = useSelector(selectLayout);

  const dispatch = useDispatch();

  return (
    <WidgetGridLayout
      widgets={widgets}
      layout={layout}
      onLayoutChange={(layout) => dispatch(setLayout(layout))}
    />
  );
}
