import ShowDetailBottomSheet from '@com/_organisms/ShowDetailBottomSheet';
import { ChevronLeftIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import classNames from 'classnames';
import { useState } from 'react';

const Detail = ({
  productDescription,
  producerCountry,
  productShape,
  licenseProvider,
  medicalUses,
  warning,
}: any) => {
  const [isShow, setIsShow] = useState(false);
  const { addModal } = useModal();
  const isShowProductDetailHandler = () => {
    setIsShow((prev) => !prev);
  };

  const openDetailBottomSheetHandler = ({ title, description }) => {
    addModal({
      modal: ShowDetailBottomSheet,
      props: {
        title: title,
        description: description,
      },
    });
  };
  return (
    <div className="px-4">
      <h1 className="font-medium mb-2">معرفی محصول</h1>
      <p
        className={classNames(
          `text-content-tertiary mb-3`,
          isShow ? '' : 'max-h-11 line-clamp-2',
        )}
      >
        {productDescription}
      </p>
      <div className="flex justify-end">
        {!isShow && (
          <span
            onClick={isShowProductDetailHandler}
            className="h-8 px-3 py-1 font-medium cursor-pointer"
          >
            مشاهده بیشتر
          </span>
        )}
      </div>
      {(producerCountry || productShape || licenseProvider) && (
        <>
          <h1 className="font-medium mb-2">مشخصات محصول</h1>
          <div className="mt-2">
            {producerCountry && (
              <div className="w-full flex gap-1">
                <span className="font-medium text-content-secondary">
                  کشور تولید کننده:
                </span>
                <span className="font-normal text-content-tertiary">
                  {producerCountry}
                </span>
              </div>
            )}
            {productShape && (
              <div className="w-full flex gap-1">
                <span className="font-medium text-content-secondary">
                  شکل محصول:
                </span>
                <span className="font-normal text-content-tertiary">
                  {productShape}
                </span>
              </div>
            )}
            {licenseProvider && (
              <div className="w-full flex gap-1">
                <span className="font-medium text-content-secondary">
                  صادرکننده مجوز:
                </span>
                <span className="font-normal text-content-tertiary">
                  {licenseProvider}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      {medicalUses && (
        <div
          onClick={() =>
            openDetailBottomSheetHandler({
              title: 'روش مصرف',
              description: medicalUses,
            })
          }
          className="flex justify-between mt-6 cursor-pointer h-[102px]"
        >
          <div className="flex flex-col">
            <h1 className="font-medium mb-2">روش مصرف</h1>
            <p className="text-content-tertiary line-clamp-2">{medicalUses}</p>
          </div>
          <div className="flex justify-center items-center">
            <ChevronLeftIconOutline
              width={36}
              height={36}
              fill={colors.grey[400]}
            />
          </div>
        </div>
      )}
      {warning && (
        <div
          onClick={() =>
            openDetailBottomSheetHandler({
              title: 'منع مصرف',
              description: warning,
            })
          }
          className="flex justify-between mt-6 cursor-pointer h-[102px]"
        >
          <div className="flex flex-col">
            <h1 className="font-medium mb-2">منع مصرف</h1>
            <p className="text-content-tertiary line-clamp-2">{warning}</p>
          </div>
          <div className="flex justify-center items-center">
            <ChevronLeftIconOutline
              width={36}
              height={36}
              fill={colors.grey[400]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
