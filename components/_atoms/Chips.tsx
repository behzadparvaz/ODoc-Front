import NextLink from '@com/_core/NextLink';

interface Props {
  className?: string;
  link: string;
  text: string;
}
const Chips = ({ className, link, text }: Props) => {
  return (
    <NextLink href={link}>
      <a className={`px-2 border border-grey-200 py-0.5 text-sm rounded-full inline-block ${className}`}>{text}</a>
    </NextLink>
  );
};
export default Chips;
