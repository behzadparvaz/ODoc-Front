import { useState } from 'react';
import { motion } from 'framer-motion';

import { colors } from '@configs/Theme';
import Icon from '@utilities/icon';

type OrderItemDescriptionProps = {
  ItemDescription: any;
};

const OrderItemDescription = ({
  ItemDescription,
}: OrderItemDescriptionProps) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);

  const animate = {
    transition: { type: 'tween' },
    height: showDescription ? 'auto' : 48,
  };

  return (
    <motion.div
      style={{
        overflow: 'hidden',
        padding: '0',
        borderRadius: '8px',
        backgroundColor: 'rgb(239 243 254)',
      }}
      initial={{ height: 0, opacity: 1 }}
      animate={animate}
      exit={{ height: 0, opacity: 1 }}
    >
      <div
        onClick={() => setShowDescription(!showDescription)}
        className="h-12 flex items-center rounded-md px-4 cursor-pointer"
      >
        <div className="w-full flex items-center gap-x-5 ">
          <Icon
            width={1.25}
            height={1.25}
            name="CircleInformationFill"
            fill={colors?.blue[500]}
          />

          <span className="text-sm text-content-secondary">دستور مصرف</span>
        </div>

        <Icon
          width={1.25}
          height={1.25}
          name="ChevronDown"
          fill={colors?.gray[400]}
        />
      </div>

      <div className="flex px-4 items-center text-sm text-content-secondary">
        {ItemDescription}
      </div>
    </motion.div>
  );
};

export default OrderItemDescription;
