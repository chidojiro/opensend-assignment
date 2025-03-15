import { Button } from '@/core/components/Button';
import { Card } from '@/core/components/Card';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/core/components/Dialog';
import { Field } from '@/core/components/Field';
import { Form } from '@/core/components/Form';
import { Input } from '@/core/components/Input';
import { Textarea } from '@/core/components/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import { Widget } from '../types';
import { updateWidget } from '../widgetSlice';
import { MetricValueSection } from './MetricValueSection';
type Props = {
  open: boolean;
  onClose: () => void;
  widget: Widget;
};

const WIDGET_TYPES: Record<Widget['type'], string> = {
  IDENTITIES_PROVIDED: 'Identities provided - TEXT',
  YOTPO_METRIC: 'Yotpo Metric - TEXT',
  ITERABLE_METRIC: 'Iterables Metric - TEXT',
};

const widgetFormSchema = z.object({
  title: z.string().trim().min(1, { message: 'Title is required' }),
  description: z.string().trim().min(1, { message: 'Description is required' }),
});

export const WidgetDialog = ({ widget, open, onClose }: Props) => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof widgetFormSchema>>({
    resolver: zodResolver(widgetFormSchema),
    defaultValues: {
      title: widget.title,
      description: widget.description,
    },
    mode: 'onChange',
  });

  const handleSubmit = form.handleSubmit((data) => {
    dispatch(updateWidget({ ...widget, ...data }));
    onClose();
  });

  return (
    <Dialog open={open} onOpenChange={(open) => (open ? undefined : onClose())}>
      <DialogContent>
        <DialogHeader
          title='Configure widget'
          description='Configure widget to display on the overview page.'
        />
        <DialogBody>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            <MetricValueSection widget={widget} className='col-span-1 lg:col-span-2' />

            <div className='flex flex-col gap-5'>
              <Card>
                <h3 className='text-gray-400 font-semibold'>Widget type</h3>
                <p className='font-semibold'>{WIDGET_TYPES[widget.type]}</p>
              </Card>

              <Card>
                <Form form={form}>
                  <div className='flex flex-col gap-4'>
                    <Field
                      name='title'
                      component={Input}
                      label='Title'
                      placeholder='Title'
                      required
                    />
                    <Field
                      name='description'
                      component={Textarea}
                      label='Description'
                      placeholder='Description'
                      required
                    />
                  </div>
                </Form>
              </Card>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant='solid-primary'
            disabled={!form.formState.isValid}
            onClick={() => handleSubmit()}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
