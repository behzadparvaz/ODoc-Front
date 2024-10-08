import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { IconButton, IconButtonProps } from './index';
import { RightArrow } from '../icons';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  title: 'Components/IconButton',
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const deafultArgs: IconButtonProps = {
  children: <RightArrow height={16} width={16} stroke={'black'} />,
  variant: 'primary',
  buttonType: 'outlined',
  size: 'large',
  disabled: false,
  handleClick: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-20 flex items-center justify-center bg-white">
        <IconButton {...args} />
      </div>
    );
  },
};
