import { routeList } from '@routes/routeList';
import Link from 'next/link';
import { memo } from 'react';

const PrivacyPolicyText = () => {
  return (
    <span>
      <p className="text-xs text-grey-500 text-center mb-4">
        با ثبت نام در تپسی دکتر
        <Link href={routeList?.policyRoute}>
          <span className="text-content-accent"> شرایط و مقررات </span>
        </Link>
        را می پذیرم.
      </p>
    </span>
  );
};
export default memo(PrivacyPolicyText);
