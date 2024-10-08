import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Radio, RadioProps } from './index';

const meta: Meta<typeof Radio> = {
  component: Radio,
  title: 'Components/Radio',
};

export default meta;
type Story = StoryObj<typeof Radio>;

const deafultArgs: RadioProps = {
  label: 'بیمار خاص',
  checked: true,
  handleChange: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <Radio className="w-40" {...args} />
      </div>
    );
  },
};
