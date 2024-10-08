import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Spinner, SpinnerProps } from './index';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Components/Spinner',
};

export default meta;
type Story = StoryObj<typeof Spinner>;

const deafultArgs: SpinnerProps = {
  color: 'bg-orange-500',
  width: 'w-2.5',
  height: 'h-2.5',
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <Spinner className="w-40" {...args} />
      </div>
    );
  },
};
