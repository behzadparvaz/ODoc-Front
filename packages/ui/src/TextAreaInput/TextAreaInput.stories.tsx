import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TextAreaInput, TextAreaInputProps } from './index';

const meta: Meta<typeof TextAreaInput> = {
  component: TextAreaInput,
  title: 'Components/TextAreaInput',
};

export default meta;
type Story = StoryObj<typeof TextAreaInput>;

const deafultArgs: TextAreaInputProps = {
  id: 'description',
  label: 'توضیحات',
  value:
    'رص فیتو فانر PHYTO PHANERE یک مکمل کاملا طبیعی است که برای افزایش رشد مو و همچنین تقویت و رشد ناخن استفاده می شود.',
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
        <TextAreaInput className="w-96" {...args} />
      </div>
    );
  },
};
