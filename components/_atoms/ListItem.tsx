interface Props {
  className?: string;
  text: string;
}
const ListItem = ({text,className=''}:Props) => {
  return (
    <p className={`text-grey-600 flex gap-x-1.5 items-center  ${className}`}>
      <span className="w-1.5 h-1.5 bg-black inline-block rounded-full" />
      {text}
    </p>
  );
};
export default ListItem;
