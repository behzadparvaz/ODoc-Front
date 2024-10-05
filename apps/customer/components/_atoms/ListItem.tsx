interface Props {
  className?: string;
  text: string;
}
const ListItem = ({ text, className = '' }: Props) => {
  return (
    <p className={`text-grey-600 flex gap-x-1.5 items-center  ${className}`}>
      {text}
    </p>
  );
};
export default ListItem;
