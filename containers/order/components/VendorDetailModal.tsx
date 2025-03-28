import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import NextImage from '@com/_core/NextImage';
import {
  ChevronLeftIconOutline,
  ChevronUpIcon,
  CloseIconOutline,
} from '@com/icons';
import { MainLayout } from '@com/Layout';
import {
  FullModalAnimations,
  FullModalContainer,
} from '@com/modal/containers/fullMobileContainer';
import { colors } from '@configs/Theme';
import Divider from '@com/_atoms/Divider';
import useModal from '@hooks/useModal';

type VendorDetailModalProps = {
  data: any;
  workingHourData: any;
};

const VendorDetailModal = ({
  data,
  workingHourData,
}: VendorDetailModalProps) => {
  const { removeLastModal } = useModal();
  const [staffColapseOpen, setStaffColapseOpen] = useState(true);
  const [contactColapseOpen, setContactColapseOpen] = useState(true);
  const [workingHourColapseOpen, setWorkingHourColapseOpen] = useState(true);

  const staffAnimate = {
    transition: { type: 'tween' },
    height: staffColapseOpen ? 'auto' : 0,
  };
  const contactAnimate = {
    transition: { type: 'tween' },
    height: contactColapseOpen ? 'auto' : 0,
  };
  const workingHourAnimate = {
    transition: { type: 'tween' },
    height: workingHourColapseOpen ? 'auto' : 0,
  };

  return (
    <FullModalContainer animation={FullModalAnimations.none}>
      <MainLayout>
        <div className="relative aspect-w-23 aspect-h-10">
          <div className="w-full h-10 px-4 absolute z-20 top-1/4 flex justify-end items-center">
            <div
              className="w-10 h-10 flex items-center justify-center bg-surface-primary overflow-hidden rounded-full cursor-pointer"
              onClick={removeLastModal}
            >
              <CloseIconOutline width={24} height={24} stroke={colors.black} />
            </div>
          </div>

          <div className="w-full h-full">
            <NextImage alt="vendor-page" src={'/images/vendor-page.png'} fill />
          </div>
        </div>

        <div className="w-full flex justify-end px-[20px] -translate-y-[46px]">
          <div className="w-[64px] h-[64px] flex items-center justify-center  overflow-hidden rounded-lg">
            <NextImage alt="vendor-logo" src={''} width={64} height={64} />
          </div>
        </div>

        <div className="w-full flex flex-col -translate-y-[46px]">
          <span className="text-2xl font-semibold px-5">
            {data?.vendorName}
          </span>

          <span className="w-full px-5 py-3 h-full min-h-[32px] text-xs text-content-primary">
            {data?.location?.address}
          </span>

          <div className="flex flex-col justify-center">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setStaffColapseOpen(!staffColapseOpen)}
            >
              <span className="text-sm font-semibold">اطلاعات داروخانه</span>

              {staffColapseOpen ? (
                <ChevronUpIcon width={20} height={20} fill={colors.gray[400]} />
              ) : (
                <ChevronLeftIconOutline
                  width={20}
                  height={20}
                  fill={colors.gray[400]}
                />
              )}
            </div>

            <motion.div
              style={{ overflow: 'hidden', padding: '0 20px' }}
              initial={{ height: 0, opacity: 1 }}
              animate={staffAnimate}
              exit={{ height: 0, opacity: 1 }}
            >
              <div className="py-3 flex flex-col gap-y-3">
                <span className="text-sm font-normal text-content-secondary">
                  {`مدیر داروخانه: ${data?.founder?.name}`}
                </span>
              </div>
            </motion.div>
          </div>

          <Divider className="h-[0.5px]" />

          <div className="flex flex-col justify-center">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setWorkingHourColapseOpen(!workingHourColapseOpen)}
            >
              <span className="text-sm font-semibold">ساعت کاری هفتگی</span>

              {workingHourColapseOpen ? (
                <ChevronUpIcon width={20} height={20} fill={colors.gray[400]} />
              ) : (
                <ChevronLeftIconOutline
                  width={20}
                  height={20}
                  fill={colors.gray[400]}
                />
              )}
            </div>

            <motion.div
              style={{ overflow: 'hidden', padding: '0 20px' }}
              initial={{ height: 0, opacity: 1 }}
              animate={workingHourAnimate}
              exit={{ height: 0, opacity: 1 }}
            >
              <div className="flex flex-col gap-y-3 pb-3 text-content-tertiary">
                {workingHourData?.vendorWorkingHours?.map((item, index) => {
                  if (!item?.openingTime && !item?.closingTime) {
                    return (
                      <span
                        key={item?.dayOfWeek}
                        className="flex items-center gap-x-2"
                      >{`${item?.dayOfWeekNameFa}: تعطیل`}</span>
                    );
                  }
                  return (
                    <span
                      key={item?.dayOfWeek}
                      className={`flex items-center gap-x-2 ${index === workingHourData?.vendorWorkingHours?.length - 1 ? '-order-2' : ''}`}
                    >{`${item?.dayOfWeekNameFa}: ${parseInt(item?.openingTime.split(':')[0], 10)} - ${parseInt(item?.closingTime.split(':')[0], 10)}`}</span>
                  );
                })}
              </div>
            </motion.div>
          </div>

          <Divider className="h-[0.5px]" />

          <div className="flex flex-col justify-center">
            <div
              className="flex items-center justify-between px-4 py-3 cursor-pointer"
              onClick={() => setContactColapseOpen(!contactColapseOpen)}
            >
              <span className="text-sm font-semibold">شماره تماس</span>

              {contactColapseOpen ? (
                <ChevronUpIcon width={20} height={20} fill={colors.gray[400]} />
              ) : (
                <ChevronLeftIconOutline
                  width={20}
                  height={20}
                  fill={colors.gray[400]}
                />
              )}
            </div>

            <motion.div
              style={{ overflow: 'hidden', padding: '0 20px' }}
              initial={{ height: 0, opacity: 1 }}
              animate={contactAnimate}
              exit={{ height: 0, opacity: 1 }}
            >
              <div className="py-3 flex flex-col gap-y-3">
                <Link href={`tel:02141630500`}>
                  <span className="text-sm font-normal text-content-secondary">
                    {data?.contactNumber}
                  </span>
                </Link>
              </div>
            </motion.div>
          </div>

          <Divider className="h-[0.5px]" />

          <span className="w-full px-5 py-3 text-base text-content-primary font-medium leading-6">
            {data?.pharmacyType?.name}
          </span>
        </div>
      </MainLayout>
    </FullModalContainer>
  );
};

export default VendorDetailModal;
