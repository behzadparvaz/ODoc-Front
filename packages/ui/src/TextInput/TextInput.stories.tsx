import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TextInput, TextInputProps } from './index';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Components/TextInput',
};

export default meta;
type Story = StoryObj<typeof TextInput>;

const deafultArgs: TextInputProps = {
  id: 'firstName',
  isRequired: true,
  isTouched: true,
  errorMessage: 'این فیلد الزامی است',
  label: 'نام',
  placeholder: 'نام',
  value: 'محمد',
  onChange: fn(),
  onBlur: fn(),
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-40 flex items-center justify-center bg-white">
        <TextInput className="w-96" {...args} />
      </div>
    );
  },
};
