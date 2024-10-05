import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Counter, CounterProps } from './index';

const meta: Meta<typeof Counter> = {
  component: Counter,
  title: 'Components/Counter',
};

export default meta;
type Story = StoryObj<typeof Counter>;

const deafultArgs: CounterProps = {
  id: 'counter',
  value: 10,
  handleDecrement: fn(),
  handleIncrement: fn(),
  onChange: fn(),
  onBlur: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <Counter max={8} {...args} />
      </div>
    );
  },
};
