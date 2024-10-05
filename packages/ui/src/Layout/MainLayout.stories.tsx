import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MainLayout, MainLayoutProps } from './index';
import { BasketIconOutline, RightArrow } from '../icons';
import { colorPalette } from '../theme';

const meta: Meta<typeof MainLayout> = {
  component: MainLayout,
  title: 'Layout/MainLayout',
};

export default meta;
type Story = StoryObj<typeof MainLayout>;

const deafultArgs: MainLayoutProps = {
  hasHeader: true,
  hasBottomGap: true,
  hasBottomNavigation: true,
  title: 'سبد خرید',
  leftIcon: (
    <BasketIconOutline height={20} width={20} fill={colorPalette.grey[400]} />
  ),
  rightIcon: (
    <RightArrow height={16} width={16} stroke={colorPalette.grey[400]} />
  ),
  handleClickLeftIcon: fn(),
  handleClickRightIcon: fn(),
  pathname: '/',
};

export const Dynamic: Story = {
  args: {
    ...deafultArgs,
  },
  render: (args) => {
    return (
      <div className="w-full h-full">
        <MainLayout {...args} />
      </div>
    );
  },
};
