import { useDispatch, useSelector } from 'react-redux';
import { WidgetGridLayout } from './WidgetGridLayout';
import { selectLayouts, selectWidgets, setLayout } from './dashboardSlice';
import { PageTitle } from '@/features/layout/PageTitle';

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
