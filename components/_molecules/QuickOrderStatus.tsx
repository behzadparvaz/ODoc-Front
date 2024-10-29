import { useGetActiveOrderStatus } from '@api/order/orderApis.rq';
import QuickOrderStatusItem from '@com/_atoms/QuickOrderStatusItem';
import {
  CallOutlineIcon,
  TickIcon,
  TimerIcon,
  WarninglineIcon,
} from '@com/icons';
import { colors } from '@configs/Theme';
import { routeList } from '@routes/routeList';

type QuickOrderStatusProps = {
  data: any;
  status?: number;
};
const QuickOrderStatus = ({ data, status }: QuickOrderStatusProps) => {
  const handleReturnInfo: any = () => {
    switch (status) {
      case 1:
        return {
          title: 'در حال بررسی پزشک',
          icon: (
            <span className="bg-yellow-50 inline-block p-1.5 rounded-full ">
              <TimerIcon width={20} height={20} fill={colors?.yellow[400]} />
            </span>
          ),
          link: null,
          CTAText: `زمان انتظار حداکثر ${data?.waitingTimeInMin} دقیقه`,
        };
      case 2:
        return {
          title: 'تایید شد',
          icon: (
            <span className="bg-green-50 inline-block p-1.5 rounded-full ">
              <TickIcon width={20} height={20} stroke={colors.green[500]} />
            </span>
          ),
          link: `${routeList?.QuickOrderDetail}/${data?.orderUuid}`,
          CTAText: 'مشاهده جزییات درخواست',
        };
      case 3:
        return {
          title: 'عدم تأیید درخواست',
          icon: (
            <span className="bg-red-50 inline-block p-1.5 rounded-full ">
              <WarninglineIcon width={20} height={20} fill={colors.red[500]} />
            </span>
          ),
          link: `${routeList?.QuickOrderDetail}/${data?.orderUuid}`,
          CTAText: 'مشاهده جزییات درخواست',
        };
      case 4:
        return {
          title: 'نیاز به تماس',
          icon: (
            <span className="bg-green-50 inline-block p-1.5 rounded-full ">
              <CallOutlineIcon
                width={20}
                height={20}
                fill={colors.green[500]}
              />
            </span>
          ),
          link: `/`,
          CTAText: 'تماس با پزشک',
        };
      case 5:
        return {
          title: 'نیاز به نسخه',
          icon: (
            <span className="bg-yellow-50 inline-block p-1.5 rounded-full ">
              <WarninglineIcon
                width={20}
                height={20}
                fill={colors.yellow[500]}
              />
            </span>
          ),
          link: `${routeList?.QuickOrderDetail}/${data?.orderUuid}`,
          CTAText: 'مشاهده جزییات درخواست',
        };
    }
  };

  return (
    <QuickOrderStatusItem
      subTitle={data?.description}
      title={handleReturnInfo()?.title}
      icon={handleReturnInfo()?.icon}
      CTAText={handleReturnInfo()?.CTAText}
      link={handleReturnInfo()?.link}
    />
  );
};
export default QuickOrderStatus;
