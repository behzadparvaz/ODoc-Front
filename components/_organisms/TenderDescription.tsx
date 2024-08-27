import { TenderDescriptionDataModel } from '@utilities/interfaces/tender';

type TenderDescriptionProps = {
  description: TenderDescriptionDataModel;
};
const TenderDescription = ({ description }: TenderDescriptionProps) => {
  return (
    <div className="w-full h-max flex flex-col items-start gap-y-3 text-base leading-6">
      <div className="w-full h-max flex flex-col items-start gap-y-2 py-3 px-4">
        <span className="font-bold">توضیحات شما</span>

        <div className="w-full h-max rounded-xl p-4 bg-grey-50">
          <p>{description.customerNotes}</p>
        </div>
      </div>

      <div className="w-full h-max flex flex-col items-start gap-y-2 py-3 px-4">
        <span className="font-bold">توضیحات داروخانه</span>

        <div className="flex flex-col gap-y-2 w-full h-max rounded-xl p-4 bg-grey-50">
          <p>{description.drugStoreNotes} </p>

          <span className="flex justify-end items-center">
            <audio controls>
              <source src={description.drugStoreVoice} type="audio/mpeg" />
            </audio>
          </span>
        </div>
      </div>
    </div>
  );
};
export default TenderDescription;
