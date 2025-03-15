import { useDispatch, useSelector } from 'react-redux';
import { WidgetGridLayout } from './WidgetGridLayout';
import { selectLayouts, selectWidgets, setLayout } from './dashboardSlice';

export default function DashboardPage() {
  const widgets = useSelector(selectWidgets);
  const layouts = useSelector(selectLayouts);

  const dispatch = useDispatch();

  return (
    <WidgetGridLayout
      widgets={widgets}
      layouts={layouts}
      onLayoutChange={(layout) => dispatch(setLayout(layout))}
    />
  );
}
