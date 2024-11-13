type AddressDetailProps = {
  address?: string;
};

const AddressDetail = ({ address }: AddressDetailProps) => {
  return (
    <div className="h-[78px] w-full flex flex-col justify-center px-4">
      <span className="text-base leading-6 font-medium">آدرس</span>
      <span className="text-sm text-content-tertiary">{address}</span>
    </div>
  );
};

export default AddressDetail;
