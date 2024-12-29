import { motion } from 'framer-motion';
import { useState } from 'react';

import { ChevronLeftIconOutline, ChevronUpIcon } from '@com/icons';
import { generalTexts } from '@com/texts/generalTexts';
import { colors } from '@configs/Theme';
import Icon from '@utilities/icon';

const Rules = () => {
  const [collapseOpen, setCollapseOpen] = useState(true);

  const animate = {
    transition: { type: 'tween' },
    height: collapseOpen ? 'auto' : 0,
  };
  return (
    <div className="flex flex-col justify-center">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setCollapseOpen(!collapseOpen)}
      >
        <span className="text-sm font-semibold">
          {generalTexts.policiesTitle}
        </span>

        {collapseOpen ? (
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
        style={{ overflow: 'hidden', padding: '0 16px' }}
        initial={{ height: 0, opacity: 1 }}
        animate={animate}
        exit={{ height: 0, opacity: 1 }}
      >
        <div className="py-3">
          <span className="text-sm font-normal text-content-secondary">
            {generalTexts.policiesDesc}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Rules;
