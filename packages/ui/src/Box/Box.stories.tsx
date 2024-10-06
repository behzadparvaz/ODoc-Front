import type { Meta, StoryObj } from '@storybook/react';

import { Box, BoxProps } from './index';

const meta: Meta<typeof Box> = {
  component: Box,
  title: 'Components/Box',
};

export default meta;
type Story = StoryObj<typeof Box>;

const deafultArgs: BoxProps = {
  borderColor: 'grey-100',
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-60 flex items-center justify-center bg-white">
        <Box className="w-96 h-40" {...args} />
      </div>
    );
  },
};
