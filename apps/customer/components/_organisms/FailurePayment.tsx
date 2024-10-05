import { useRouter } from 'next/router';
import classNames from 'classnames';

import FixBottomSection from '@com/_atoms/FixBottomSection';
import { FailIcon } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import { Button } from '@com/_atoms/NewButton';

const FailurePayment = ({ className = '' }) => {
  const { push } = useRouter();
  return (
    <>
      <div className={classNames('mt-[100px]', className)}>
        <div className="flex justify-center items-center w-[56px] h-[56px] bg-red-100 rounded-full">
          <FailIcon width={32} height={32} fill={colors?.red[400]} />
        </div>

        <h1 className="text-lg font-semibold mt-4 mb-7">
          {orderText?.failurePaymentText}
        </h1>

        <span className="text-xs font-normal">
          {orderText?.failurePaymentHelperText}
        </span>
      </div>

      <FixBottomSection className="border-none">
        <div className="w-full flex flex-col gap-y-3 px-4 py-3">
          <Button
            size="large"
            className="w-full"
            variant={'primary'}
            onClick={() => push(`tel:02196861727`)}
          >
            تماس با پشتیبانی
          </Button>
          <Button size="large" variant="text" onClick={() => push('/app')}>
            برگشت به خانه
          </Button>
        </div>
      </FixBottomSection>
    </>
  );
};
export default FailurePayment;
