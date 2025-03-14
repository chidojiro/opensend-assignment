import { WidgetGridLayout } from './WidgetGridLayout';

const MOCK_WIDGETS = [
  { id: '1', title: 'Widget 1', description: 'Widget 1 description' },
  { id: '2', title: 'Widget 2', description: 'Widget 2 description' },
  { id: '3', title: 'Widget 3', description: 'Widget 3 description' },
];

export default function DashboardPage() {
  return <WidgetGridLayout widgets={MOCK_WIDGETS} />;
}
