import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Select, SelectProps } from './index';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Components/Select',
};

export default meta;
type Story = StoryObj<typeof Select>;

const deafultArgs: SelectProps = {
  name: 'patient',
  label: 'بیمار خاص',
  value: '1',
  options: [
    {
      name: 'انتخاب یک',
      id: '1',
    },
    {
      name: 'انتخاب دو',
      id: '2',
    },
    {
      name: 'انتخاب سه',
      id: '3',
    },
  ],
  onChange: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <Select className="w-80" {...args} />
      </div>
    );
  },
};
