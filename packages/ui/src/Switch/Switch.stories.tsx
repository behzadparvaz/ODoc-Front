import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Switch, SwitchProps } from './index';

const meta: Meta<typeof Switch> = {
  component: Switch,
  title: 'Components/Switch',
};

export default meta;
type Story = StoryObj<typeof Switch>;

const deafultArgs: SwitchProps = {
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
        <Switch className="w-40" {...args} />
      </div>
    );
  },
};
