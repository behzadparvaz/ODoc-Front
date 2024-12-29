import Divider from '@com/_atoms/Divider';
import { colors } from '@configs/Theme';
import Icon from '@utilities/icon';
import { motion } from 'framer-motion';
import { useState } from 'react';
interface AlternateRecipientProps {
  alternateRecipientName: string;
  alternateRecipientMobileNumber: string;
}

const AlternateRecipient = ({
  alternateRecipientName,
  alternateRecipientMobileNumber,
}: AlternateRecipientProps) => {
  const [collapseOpen, setCollapseOpen] = useState(true);

  const animate = {
    transition: { type: 'tween' },
    height: collapseOpen ? 'auto' : 0,
  };

  if (!alternateRecipientName || !alternateRecipientMobileNumber) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center">
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setCollapseOpen(!collapseOpen)}
      >
        <span className="text-sm font-semibold">ارسال برای فرد دیگری</span>

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
        <Divider padding={0} />
        <div className="flex flex-col gap-y-2 justify-between px-4 my-2">
          <div className="flex gap-1">
            <span className="text-sm text-content-tertiary">نام گیرنده:</span>
            <span className="text-sm truncate">{alternateRecipientName}</span>
          </div>
          <div className="flex gap-1">
            <span className="text-sm text-content-tertiary">
              شماره تماس گیرنده:
            </span>
            <span className="text-sm truncate">
              {alternateRecipientMobileNumber}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default AlternateRecipient;
