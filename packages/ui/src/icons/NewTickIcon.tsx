type TickIconProps = {
  width: number;
  height: number;
  stroke?: string;
  className?: string;
};

const NewTickIcon = ({
  width,
  height,
  stroke,
  className = '',
}: TickIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 2 4.4 7.6 2 5.2"
        stroke={stroke}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default NewTickIcon;
