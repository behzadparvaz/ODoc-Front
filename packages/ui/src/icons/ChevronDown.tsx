import { IconModel } from '@repo/types';

const ChevronDown = ({ width, height, stroke, className }: IconModel) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.667 6.667 8 10l3.333-3.333"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default ChevronDown;
