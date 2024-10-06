import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Chips, ChipsProps } from './index';

const meta: Meta<typeof Chips> = {
  component: Chips,
  title: 'Components/Chips',
};

export default meta;
type Story = StoryObj<typeof Chips>;

const deafultArgs: ChipsProps = {
  label: 'بیمار خاص',
  clickable: true,
  clearable: true,
  size: 'medium',
  onClick: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <Chips {...args} />
      </div>
    );
  },
};
