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
    { text: 'تست1', id: 0 },
    { text: 'تست2', id: 1 },
    { text: 'تست3', id: 2 },
    { text: 'تست4', id: 3 },
    { text: 'تست5', id: 4 },
    { text: 'تست6', id: 5 },
    { text: 'تست7', id: 6 },
    { text: 'تست8', id: 7 },
  ];

  return (
    <div className={`${className}`}>
      <SectionTitle className="px-4 mb-2" title="جستجوهای پرطرفدار" />
      <ScrollSlider className="gap-x-2 px-4">
        {mockData?.map((item) => {
          return (
            <div>
              <Chips
                link={`${routeList?.search}?search_text=${item?.text}`}
                key={item?.id}
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
