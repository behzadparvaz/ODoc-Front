import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Modal, ModalProps } from './index';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Components/Modal',
};

export default meta;
type Story = StoryObj<typeof Modal>;

const deafultArgs: ModalProps = {
  title: 'افزودن کاربر',
  children: (
    <div className="w-full h-full bg-red-50 flex items-center justify-center bg-white">
      Modal
    </div>
  ),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <Modal {...args} />
      </div>
    );
  },
};
