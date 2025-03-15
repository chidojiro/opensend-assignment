import { PageTitle } from '@/features/layout/PageTitle';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetGridLayout } from './WidgetGridLayout';
import { selectLayouts, setLayout } from './dashboardSlice';
import { selectWidgets } from './widgetSlice';

export default function DashboardPage() {
  const widgets = useSelector(selectWidgets);
  const layouts = useSelector(selectLayouts);

  const dispatch = useDispatch();

  return (
    <>
      <PageTitle>Dashboard</PageTitle>
      <WidgetGridLayout
        widgets={widgets}
        layouts={layouts}
        onLayoutChange={(layout) => dispatch(setLayout(layout))}
      />
    </>
  );
}
