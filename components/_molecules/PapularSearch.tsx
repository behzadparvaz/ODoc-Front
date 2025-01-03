import dynamic from 'next/dynamic';
import { routeList } from '@routes/routeList';

interface Props {
  className?: string;
}

const SectionTitle = dynamic(() => import('./SectionTitle.nd'));
const ScrollSlider = dynamic(() => import('./ScrollSlider.nd'));
const Chips = dynamic(() => import('@com/_atoms/Chips'));

const PapularSearch = ({ className }: Props) => {
  const mockData = [
    { text: 'ژلوفن', id: 0 },
    { text: 'استامینوفن', id: 1 },
    { text: 'ستیریزین', id: 2 },
  ];

  return (
    <div className={`${className}`}>
      <SectionTitle
        className="px-4 mb-2"
        titleClassName="font-bold"
        title="جستجوهای پرطرفدار"
      />
      <ScrollSlider className="gap-x-2 px-4">
        {mockData?.map((item) => {
          return (
            <div key={item?.id}>
              <Chips
                link={`${routeList?.search}?search=${item?.text}`}
                text={item?.text}
              />
            </div>
          );
        })}
      </ScrollSlider>
    </div>
  );
};
export default PapularSearch;
