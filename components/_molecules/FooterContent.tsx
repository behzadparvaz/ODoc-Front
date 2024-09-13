import { AparatIcon, InstagramIcon, LinkedintIcon } from '@com/icons';
import { homePageText } from '@com/texts/homePage';
import { colors } from '@configs/Theme';
import React from 'react';

type Props = {};

export default function FooterContent({}: Props) {
  return (
    <footer className="bg-grey-50 p-4 flex flex-col items-start">
      {/* About us Section */}
      <div className="grid grid-cols-2 border-b border-grey-100">
        <div className="mb-4">
          <p className="text-base font-semibold mb-2">
            {homePageText.aboutTapsiDoc}
          </p>
          <p className="text-xs text-grey-500">
            {homePageText.aboutTapsiDocDesc}
          </p>
        </div>
        <div className="mb-4 space-y-4 text-left text-sm font-semibold ml-6">
          <p>{homePageText.tapsiDocMag}</p>
          <p>{homePageText.policy}</p>
          <p>{homePageText.support}</p>
        </div>
      </div>
      {/* Contact us Section */}
      <div className="grid grid-cols-2 w-full mt-3">
        <div className="mb-4">
          <p className="text-xs text-grey-500 mb-1">{homePageText.followUs}</p>
          <div className="flex">
            <LinkedintIcon
              height={20}
              width={20}
              fill={colors.black}
              innerFill={colors.white}
            />
            <AparatIcon
              height={20}
              width={20}
              fill={colors.black}
              innerFill={colors.white}
              className="mx-2"
            />
            <InstagramIcon
              height={20}
              width={20}
              fill={colors.black}
              innerFill={colors.white}
            />
          </div>
        </div>
        <div className="space-y-2 text-left ml-6">
          <h3 className="text-xs text-grey-500 mb-2">
            {homePageText.contactUs}
          </h3>
          <p className="text-xs text-grey-800">{homePageText.contactNumber}</p>
        </div>
      </div>
    </footer>
  );
}
