import { motion } from 'framer-motion';
import { useState } from 'react';

import prescriptionMedicine from '@static/images/staticImages/mainCategories/prescriptionMedicine.png';
import specialPatients from '@static/images/staticImages/mainCategories/nonPrescriptionMedicine.png';
import { colors } from '@configs/Theme';
import {
  TenderItemsListDataModel,
  TenderItemsOrderDataModel,
} from '@utilities/interfaces/tender';
import { ChevronDownIcon, ChevronUpIcon } from '@com/icons';
import NextImage from '@com/_core/NextImage';
import Divider from '@com/_atoms/Divider';

import OrderItemCard from './OrderItemCard';

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
      {data?.orderStatus?.name !== 'apay' && (
        <div>
          <Divider />

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
              <ChevronDownIcon
                width={20}
                height={20}
                stroke={colors.gray[400]}
              />
            )}
          </div>
          <motion.div
            style={{ overflow: 'hidden', padding: '0' }}
            initial={{ height: 0, opacity: 1 }}
            animate={animate}
            exit={{ height: 0, opacity: 1 }}
          >
            <div className="flex flex-col gap-3">
              {data?.referenceNumber && (
                <div className="flex justify-start items-center gap-x-2">
                  <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex justify-center items-center border-[0.5px]">
                    <NextImage
                      src={
                        data?.isSpecialPatient
                          ? specialPatients
                          : prescriptionMedicine
                      }
                      alt="Rx-image"
                      width={68}
                      height={68}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <span className="text-sm font-semibold">
                      {data?.isSpecialPatient
                        ? 'نسخه بیماری خاص'
                        : 'دارو با نسخه'}
                    </span>
                    {data?.referenceNumber ? (
                      <span className="text-sm font-semibold">
                        {`کد نسخه ${data?.referenceNumber}`}
                      </span>
                    ) : null}
                  </div>
                </div>
              )}

              {data?.orderDetails?.map(
                (item: TenderItemsOrderDataModel, index) => (
                  <OrderItemCard
                    key={item.irc}
                    item={item}
                    dataLength={data?.orderDetails?.length}
                    orderStatus={data?.orderStatus?.name}
                  />
                ),
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default OrderDetailItems;
