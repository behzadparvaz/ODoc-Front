
import { IconModel } from '@repo/types';

const RightArrow = ({ width, height, stroke, className }: IconModel) => {
  return (
     <svg width={width} height={height} fill="none" xmlns="http://www.w3.org/2000/svg" className={className}><path fill-rule="evenodd" clip-rule="evenodd" d="M9.929.929 17 8l-7.071 7.071-1.414-1.414L13.17 9H0V7h13.17L8.515 2.343 9.929.93z" fill={stroke}/></svg>
  );
};
export default RightArrow;
