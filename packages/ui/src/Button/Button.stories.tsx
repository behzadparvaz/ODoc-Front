import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button, ButtonProps } from './index';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Components/Button',
};

export default meta;
type Story = StoryObj<typeof Button>;

const deafultArgs: ButtonProps = {
  children: 'پرداخت',
  variant: 'primary',
  buttonType: 'contained',
  size: 'xLarge',
  isLoading: false,
  disabled: false,
  icon: null,
  iconPosition: 'left',
  handleClick: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <Button className="w-40" {...args} />
      </div>
    );
  },
};
