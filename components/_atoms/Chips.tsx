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
<<<<<<< HEAD
      <a
        className={`px-2 border border-grey-200 py-1 text-sm rounded-full items-center justify-between gap-x-2 flex ${className}`}
=======
      <span
        className={`px-2 border border-grey-200 py-1 text-xs rounded-full items-center justify-between gap-x-2 flex ${className}`}
>>>>>>> stage
      >
        {text}
        <ChevronLeftIconOutline width={24} height={24} fill="#000" />
      </a>
    </NextLink>
  );
};
export default Chips;
