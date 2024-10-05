import NextLink from '@com/_core/NextLink';
import { ChevronLeftIconOutline } from '@com/icons';

interface Props {
  className?: string;
  link: string;
  text: string;
}
const Chips = ({ className, link, text }: Props) => {
  return (
    <NextLink href={link}>
      <span
        className={`px-2 border border-grey-200 py-1 text-sm rounded-full items-center justify-between gap-x-2 flex ${className}`}
      >
        {text}
        <ChevronLeftIconOutline width={24} height={24} fill="#000" />
      </span>
    </NextLink>
  );
};
export default Chips;
