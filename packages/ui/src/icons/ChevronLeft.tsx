import { IconModel } from '@repo/types';

const ChevronLeft = ({ width, height, stroke, className }: IconModel) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="m15 7-5 5M15 17l-5-5"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default ChevronLeft;
