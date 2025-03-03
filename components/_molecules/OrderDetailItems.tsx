import classNames from 'classnames';
import { motion } from 'framer-motion';
import { Fragment, useState } from 'react';

import { colors } from '@configs/Theme';
import PrescriptionMedicine from '@public/images/newTiles/prescriptionMedicine.webp';
import SpecialPatients from '@public/images/newTiles/specialPatients.webp';
import {
  TenderItemsListDataModel,
  TenderItemsOrderDataModel,
} from '@utilities/interfaces/tender';

import NextImage from '@com/_core/NextImage';

import Divider from '@com/_atoms/Divider';
import Icon from '@utilities/icon';
import { convertRialToTomanNumber } from '@utilities/mainUtils';
import OrderItemCard from './OrderItemCard';
import OrderItemDescription from '@containers/order/components/itemDescription';

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
          <Icon
            name="ChevronUp"
            width={1.5}
            height={1.5}
            fill={colors.gray[400]}
          />
        ) : (
          <Icon
            name="ChevronLeft"
            width={1.5}
            height={1.5}
            fill={colors.gray[400]}
          />
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
                <Fragment key={item?.referenceNumber}>
                  <div className="grid justify-start items-center gap-x-2 pb-3 grid-cols-[64px_1fr]">
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
                          style={{
                            width: 40,
                            height: 40,
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    </div>

                    <div className="col-start-2 w-full flex items-center justify-between">
                      <div className="flex flex-col gap-y-2">
                        <span
                          className={classNames(
                            'text-sm font-medium',
                            !item?.price &&
                              !data?.isSpecialPatient &&
                              data?.orderStatus?.name !== 'ack' &&
                              data?.orderStatus?.name !== 'draft' &&
                              'text-content-disabled',
                          )}
                        >
                          {data?.isSpecialPatient
                            ? 'نسخه داروخانه های ۱۳ آبان'
                            : 'دارو با نسخه'}
                        </span>

                        <span
                          className={classNames(
                            'text-sm',
                            !item?.price &&
                              !data?.isSpecialPatient &&
                              data?.orderStatus?.name !== 'ack' &&
                              data?.orderStatus?.name !== 'draft' &&
                              'text-content-disabled',
                          )}
                        >
                          {`کد نسخه ${item?.referenceNumber}`}
                        </span>
                      </div>

                      {data?.orderStatus?.name !== 'ack' &&
                        data?.orderStatus?.name !== 'draft' && (
                          <span className="text-sm font-medium leading-5 flex items-center gap-x-1">
                            {item?.price
                              ? convertRialToTomanNumber(
                                  item?.price,
                                ).toLocaleString('fa-IR')
                              : ''}

                            <span
                              className={classNames(
                                'text-xs',
                                !item?.price &&
                                  !data?.isSpecialPatient &&
                                  'text-content-disabled',
                              )}
                            >
                              {item?.price
                                ? 'تومان'
                                : !data?.isSpecialPatient
                                  ? 'ناموجود'
                                  : ''}
                            </span>
                          </span>
                        )}
                    </div>
                  </div>

                  {item?.doctorInstruction && (
                    <OrderItemDescription
                      ItemDescription={item?.doctorInstruction}
                    />
                  )}

                  <Divider className="h-[1px]" padding={0} />
                </Fragment>
              );
            } else {
              return (
                <Fragment key={item.irc}>
                  <OrderItemCard
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
                      item?.isunavailable
                    }
                    discountPercentage={item?.discount?.percentage}
                  />

                  {data?.orderStatus?.name !== 'draft' &&
                    data?.orderStatus?.name !== 'ack' &&
                    data?.orderStatus?.name !== 'cancelcustomer' &&
                    data?.orderStatus?.name !== 'cancelvendor' &&
                    data?.orderStatus?.name !== 'return' &&
                    data?.orderStatus?.name !== 'reject' &&
                    data?.orderStatus?.name !== 'nfc' &&
                    !item?.price &&
                    item?.alternatives[0]?.price && (
                      <OrderItemCard
                        key={item?.alternatives[0]?.irc}
                        item={item?.alternatives[0]}
                        isAlternative
                        discountPercentage={item?.discount?.percentage}
                      />
                    )}

                  {item?.doctorInstruction && (
                    <OrderItemDescription
                      ItemDescription={item?.doctorInstruction}
                    />
                  )}

                  <Divider className="h-[1px]" />
                </Fragment>
              );
            }
          })}
        </div>
      </motion.div>
    </>
  );
};

export default OrderDetailItems;
