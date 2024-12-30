import NextImage from '@com/_core/NextImage';
import NextLink from '@com/_core/NextLink';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';
import Icon from '@utilities/icon';

const QuickOrderBanner = () => (
  <div className="px-4 mb-5">
    <NextLink href={routeList?.QuickOrder}>
      <div className="p-3 grid grid-cols-[64px_1fr_24px] bg-gray-50 items-center rounded-xl text-base gap-x-2">
        <div className="w-[64px] h-[64px] flex items-center justify-center rounded-lg overflow-hidden">
          <NextImage
            alt="fast-order"
            src={'/images/fast-order.png'}
            width={64}
            height={64}
          />
        </div>
        <div className="w-full flex flex-col gap-4">
          <span className="text-sm text-content-primary font-medium">
            داروهات رو پیدا نکردی؟!
          </span>
          <span className="text-xs text-content-tertiary font-normal line-clamp-2">
            در این بخش شما میتوانید عنوان داروی مورد نیازتان را درج کنید.
          </span>
        </div>
        <Icon
          name="ChevronLeft"
          width={1.5}
          height={1.5}
          fill={colors?.gray[400]}
        />
      </div>
    </NextLink>
  </div>
);
export default QuickOrderBanner;
