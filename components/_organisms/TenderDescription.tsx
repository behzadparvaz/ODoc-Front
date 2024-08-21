import { TenderDescriptionDataModel } from '@utilities/interfaces/tender';

type TenderDescriptionProps = {
  description: TenderDescriptionDataModel;
};
const TenderDescription = ({ description }: TenderDescriptionProps) => {
  return (
    <div className="w-full h-max flex flex-col items-start gap-y-5">
      <span className="flex justify-center items-center">توضیحات شما</span>

      <div className="text-sm w-full h-max border rounded-xl p-4">
        <p>{description.customerNotes}</p>
      </div>

      <span className="flex justify-center items-center">توضیحات داروخانه</span>

      <div className="flex flex-col gap-y-2text-sm w-full h-max border rounded-xl p-4">
        <p>{description.drugStoreNotes} </p>

        <span className="flex justify-end items-center">
          <audio controls>
            <source src={description.drugStoreVoice} type="audio/mpeg" />
          </audio>
        </span>
      </div>
    </div>
  );
};
export default TenderDescription;
