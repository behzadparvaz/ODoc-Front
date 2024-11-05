import React from 'react';
import Link from 'next/link';

import { AparatIcon, InstagramIcon, LinkedintIcon } from '@com/icons';
import { homePageText } from '@com/texts/homePage';
import { colors } from '@configs/Theme';

type Props = {};

export default function FooterContent({}: Props) {
  const enamadCode = `<a referrerpolicy='origin' target='_blank' href='${process.env.NEXT_PUBLIC_ENAMAD_API_URL}/?id=${process.env.NEXT_PUBLIC_ENAMAD_API_TOKEN}'><img referrerpolicy='origin' src='${process.env.NEXT_PUBLIC_ENAMAD_API_URL}/logo.aspx?id=${process.env.NEXT_PUBLIC_ENAMAD_API_TOKEN}' alt='' style='cursor:pointer;height:40px;width:40px' code='${process.env.NEXT_PUBLIC_ENAMAD_API_TOKEN}'></a>`;

  return (
    <footer className="bg-grey-50 p-4 flex flex-col items-start">
      {/* About us Section */}
      <div className="grid grid-cols-2 border-b border-grey-100">
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">
            {homePageText.aboutTapsiDoc}
          </p>
          <p className="text-2xs text-grey-500">
            {homePageText.aboutTapsiDocDesc}
          </p>
        </div>
        <div className="flex flex-col items-end text-xs font-semibold pl-6 gap-y-4 mb-4">
          <p>{homePageText.tapsiDocMag}</p>
          <p>{homePageText.policy}</p>
          <Link href={`tel:02196861727`}>
            <p className="cursor-pointer">{homePageText.support}</p>
          </Link>
          <div className="grid grid-rows-1 grid-cols-1 w-10 h-10 overflow-hidden justify-center items-center cursor-pointer">
            <div
              className="row-start-1 col-start-1 z-2"
              dangerouslySetInnerHTML={{ __html: enamadCode }}
            />
          </div>
        </div>
      </div>
      {/* Contact us Section */}
      <div className="grid grid-cols-2 w-full mt-3">
        <div className="mb-4">
          <p className="text-2xs text-grey-500 mb-1">{homePageText.followUs}</p>
          <div className="flex">
            <Link
              href="https://www.linkedin.com/company/tapsi-doctor/"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedintIcon
                height={20}
                width={20}
                fill={colors.black}
                innerFill={colors.white}
                className="cursor-pointer"
              />
            </Link>

            <Link
              href={'https://www.aparat.com/Tapsi_doctor'}
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <AparatIcon
                height={20}
                width={20}
                fill={colors.black}
                innerFill={colors.white}
                className="mx-2 cursor-pointer"
              />
            </Link>

            <Link
              href={'https://www.instagram.com/tapsi_doctor'}
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon
                height={20}
                width={20}
                fill={colors.black}
                innerFill={colors.white}
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>

        <div className="space-y-2 text-left ml-6">
          <h3 className="text-2xs text-grey-500 mb-2">
            {homePageText.contactUs}
          </h3>
          <Link href={`tel:02196861727`}>
            <p className="text-2xs text-grey-800 cursor-pointer">
              {homePageText.contactNumber}
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
