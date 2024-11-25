import { motion } from 'framer-motion';
import { useState } from 'react';

import PrescriptionMedicine from '@public/images/tiles/prescriptionMedicine.png';
import SpecialPatients from '@public/images/tiles/nonPrescriptionMedicine.png';
import { colors } from '@configs/Theme';
import {
  TenderItemsListDataModel,
  TenderItemsOrderDataModel,
} from '@utilities/interfaces/tender';
import { ChevronDownIcon, ChevronUpIcon } from '@com/icons';
import NextImage from '@com/_core/NextImage';

import OrderItemCard from './OrderItemCard';
import { convertRialToTomanNumber } from '@utilities/mainUtils';
import Divider from '@com/_atoms/Divider';

type OrderDetailItemsProps = {
  data: TenderItemsListDataModel;
};

const OrderDetailItems = ({ data }: OrderDetailItemsProps) => {
  const [itemsCollapseOpen, setItemsCollapseOpen] = useState(true);

  const animate = {
    transition: { type: 'tween' },
    height: itemsCollapseOpen ? 'auto' : 0,
  };

  return (
    <>
      <div
        onClick={() => setItemsCollapseOpen(!itemsCollapseOpen)}
        className="flex items-center justify-between cursor-pointer px-4 py-3"
      >
        <span className="text-content-primary text-base leading-6">
          اقلام سفارش
        </span>
        {itemsCollapseOpen ? (
          <ChevronUpIcon width={20} height={20} fill={colors.gray[400]} />
        ) : (
          <ChevronDownIcon width={20} height={20} stroke={colors.gray[400]} />
        )}
      </div>
      <motion.div
        style={{ overflow: 'hidden', padding: '0' }}
        initial={{ height: 0, opacity: 1 }}
        animate={animate}
        exit={{ height: 0, opacity: 1 }}
      >
        <div className="flex flex-col gap-3 px-3">
          {data?.orderDetails?.map((item: TenderItemsOrderDataModel) => {
            if (!!item?.referenceNumber) {
              return (
                <div
                  key={item?.referenceNumber}
                  className="grid justify-start items-center gap-x-2 pb-3 grid-cols-[64px_1fr]"
                >
                  <div className="w-[64px] h-full flex justify-center items-center">
                    <div className="col-start-1 w-[40px] h-[40px] rounded-xl overflow-hidden flex justify-center items-center ">
                      <NextImage
                        src={
                          data?.isSpecialPatient
                            ? SpecialPatients
                            : PrescriptionMedicine
                        }
                        alt="Rx-image"
                        width={40}
                        height={40}
                      />
                    </div>
                  </div>

                  <div className="col-start-2 w-full flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                      <span className="text-sm font-medium">
                        {data?.isSpecialPatient
                          ? 'نسخه بیماری خاص'
                          : 'دارو با نسخه'}
                      </span>

                      <span className="text-sm">
                        {`کد نسخه ${item?.referenceNumber}`}
                      </span>
                    </div>

                    <span className="text-sm font-medium leading-5 flex items-center gap-x-1">
                      {item?.price
                        ? convertRialToTomanNumber(item?.price).toLocaleString(
                            'fa-IR',
                          )
                        : ''}
                      <span className="text-xs">
                        {item?.price ? 'تومان' : ''}
                      </span>
                    </span>
                  </div>
                </div>
              );
            } else {
              return (
                <>
                  <OrderItemCard
                    key={item.irc}
                    item={item}
                    dataLength={data?.orderDetails?.length}
                    orderStatus={data?.orderStatus?.name}
                    isUnavaiable={
                      data?.orderStatus?.name !== 'draft' &&
                      data?.orderStatus?.name !== 'ack' &&
                      data?.orderStatus?.name !== 'cancelcustomer' &&
                      data?.orderStatus?.name !== 'cancelvendor' &&
                      data?.orderStatus?.name !== 'return' &&
                      data?.orderStatus?.name !== 'reject' &&
                      data?.orderStatus?.name !== 'nfc' &&
                      !item?.price
                    }
                  />

                  {data?.orderStatus?.name !== 'draft' &&
                    data?.orderStatus?.name !== 'ack' &&
                    data?.orderStatus?.name !== 'cancelcustomer' &&
                    data?.orderStatus?.name !== 'cancelvendor' &&
                    data?.orderStatus?.name !== 'return' &&
                    data?.orderStatus?.name !== 'reject' &&
                    data?.orderStatus?.name !== 'nfc' &&
                    !item?.price && (
                      <>
                        <Divider className="h-[0.5px]" />

                        <OrderItemCard
                          key={item?.alternatives[0]?.irc}
                          item={item?.alternatives[0]}
                        />
                      </>
                    )}
                </>
              );
            }
          })}
        </div>
      </motion.div>
    </>
  );
};

export default OrderDetailItems;
