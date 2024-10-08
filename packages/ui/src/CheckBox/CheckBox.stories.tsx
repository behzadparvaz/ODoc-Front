import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { CheckBox, CheckBoxProps } from './index';

const meta: Meta<typeof CheckBox> = {
  component: CheckBox,
  title: 'Components/CheckBox',
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

const deafultArgs: CheckBoxProps = {
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
        <CheckBox className="w-40" {...args} />
      </div>
    );
  },
};
