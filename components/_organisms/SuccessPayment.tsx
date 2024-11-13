import { useRouter } from 'next/router';

import Button from '@com/_atoms/Button';
import { TickIcon } from '@com/icons';
import { orderText } from '@com/texts/orderText';
import { colors } from '@configs/Theme';
import classNames from 'classnames';

const SuccessPayment = ({ className = '' }) => {
  const { push } = useRouter();
  return (
    <div className={classNames('mt-[100px]', className)}>
      <div className="flex justify-center items-center w-[56px] h-[56px] bg-green-50 rounded-full">
        <TickIcon width={32} height={32} stroke={colors?.green[400]} />
      </div>
      <h1 className="text-base font-semibold mt-4 mb-7">
        {orderText?.successPaymentText}
      </h1>

      <Button
        size="large"
        className="text-md w-max px-2"
        buttonType="contained"
        variant={'primary'}
        handleClick={() => push('/app')}
      >
        برگشت به خانه
      </Button>
    </div>
  );
};
export default SuccessPayment;
