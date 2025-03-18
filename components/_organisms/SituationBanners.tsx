import NextImage from '@com/_core/NextImage';
import { memo } from 'react';
type BannersName = 'chaharshanbe-soori' | 'rainy';

interface SituationBannersProps {
  bannersName: string;
}

const SituationBanners = ({ bannersName }: SituationBannersProps) => {
  if (!bannersName) return null;
  if (bannersName === 'chaharshanbe-soori') {
    return (
      <NextImage
        src={'/images/banners/chaharshanbe-soori.svg'}
        alt="chaharshanbe-soori"
        width={360}
        height={40}
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }
  if (bannersName === 'rainy') {
    return (
      <NextImage
        src={'/images/banners/rainy.svg'}
        alt="rainy"
        width={360}
        height={40}
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }
};

export default memo(SituationBanners);
