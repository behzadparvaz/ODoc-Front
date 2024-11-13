import { TenderItemsDescriptionDataModel } from '@utilities/interfaces/tender';

type TenderDescriptionProps = {
  description: TenderItemsDescriptionDataModel;
  comment: string;
};

const TenderDescription = ({
  description,
  comment,
}: TenderDescriptionProps) => {
  return (
    <div className="w-full h-max min-h-[250px] flex flex-col items-start gap-y-3 text-sm leading-6">
      {comment && (
        <div className="w-full h-max flex flex-col items-start gap-y-2 py-3 px-4">
          <span className="font-bold">توضیحات شما</span>

          <div className="w-full h-max rounded-xl p-4 bg-grey-50">
            <p>{comment}</p>
          </div>
        </div>
      )}

      {description && (
        <div className="w-full h-max flex flex-col items-start gap-y-2 py-3 px-4">
          <span className="font-bold">توضیحات داروخانه</span>

          <div className="flex flex-col gap-y-2 w-full h-max rounded-xl p-4 bg-grey-50">
            <p>{description?.comment} </p>

            {description?.link && (
              <span className="flex justify-end items-center">
                <audio controls>
                  <source src={description?.link} type="audio/mpeg" />
                </audio>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default TenderDescription;
