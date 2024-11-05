import { Button } from '@com/_atoms/NewButton';
import { ChevronLeftIconOutline, StarIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import { persianDate } from '@utilities/persianDate';
import { useState } from 'react';

const mockComments = [
  {
    id: 1,
    rate: 5,
    date: '2024-10-01T10:30:00Z',
    comment: 'این محصول فوق‌العاده است! فراتر از انتظاراتم بود.',
  },
  {
    id: 2,
    rate: 4,
    date: '2024-10-02T12:15:00Z',
    comment: 'کیفیت عالی، اما ارسال کمی طول کشید.',
  },
  {
    id: 3,
    rate: 3,
    date: '2024-10-03T14:45:00Z',
    comment: 'خوب بود. ویژگی‌ها عالی هستند، اما نیاز به بهبود دارند.',
  },
  {
    id: 4,
    rate: 2,
    date: '2024-10-04T09:00:00Z',
    comment: 'انتظار نداشتم. محصول طبق تبلیغات عمل نکرد.',
  },
  {
    id: 5,
    rate: 1,
    date: '2024-10-05T16:20:00Z',
    comment: 'بسیار ناامید شدم. به هیچ‌کس توصیه نمی‌کنم.',
  },
  {
    id: 6,
    rate: 5,
    date: '2024-10-06T11:05:00Z',
    comment: 'عالی! حتماً دوباره خرید می‌کنم.',
  },
  {
    id: 7,
    rate: 4,
    date: '2024-10-07T13:30:00Z',
    comment: 'ارزش خوبی برای قیمت دارد. از خرید خود راضی هستم.',
  },
  {
    id: 8,
    rate: 3,
    date: '2024-10-08T15:50:00Z',
    comment: 'تجربه متوسطی بود. کار می‌کند، اما گزینه‌های بهتری دیده‌ام.',
  },
  {
    id: 9,
    rate: 2,
    date: '2024-10-09T17:00:00Z',
    comment: 'راضی نیستم. کیفیت می‌تواند به‌طور قابل توجهی بهتر باشد.',
  },
  {
    id: 10,
    rate: 5,
    date: '2024-10-10T08:25:00Z',
    comment: 'شگفت‌انگیز! این دقیقاً چیزی است که دنبالش بودم!',
  },
];

const Comments = ({ comments = mockComments }) => {
  const dataComments = comments;
  const [commentList, setCommentList] = useState(dataComments.slice(0, 4));

  const [isShowMoreComments, setIsShowMoreComments] = useState(
    comments.length > 4 ? true : false,
  );

  const ShowMoreHandler = () => {
    setIsShowMoreComments((prev) => !prev);
    setCommentList([...dataComments]);
  };
  return (
    <div className="bg-white px-4">
      <div className="flex items-center justify-between h-14">
        <h1 className="font-medium">نظر کاربران</h1>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="small">
            ارسال نظر
          </Button>
        </div>
      </div>
      <div className="w-full h-10">
        <span className="text-content-tertiary">{dataComments.length} نظر</span>
      </div>
      <div className="flex flex-col gap-y-2">
        {commentList.map(({ id, rate, date, comment }) => (
          <div key={id} className="flex flex-col border-b py-2">
            <div className="flex justify-between items-center h-10">
              <div className="flex">
                {[...Array(rate)].map((_, index) => (
                  <StarIcon
                    key={index}
                    width={16}
                    height={16}
                    fill={colors.black}
                  />
                ))}
                {[...Array(5 - rate)].map((_, index) => (
                  <StarIcon
                    key={index + rate}
                    width={16}
                    height={16}
                    fill={colors.grey[400]}
                  />
                ))}
              </div>
              <span className="text-content-tertiary align-middle">
                {persianDate({
                  date: `${new Date(date)}`,
                })}
              </span>
            </div>
            <p className="text-content-tertiary">{comment}</p>
          </div>
        ))}
      </div>
      {isShowMoreComments && (
        <div
          onClick={ShowMoreHandler}
          className="flex justify-between items-center h-[52px] cursor-pointer"
        >
          <span>مشاهده همه نظرات</span>
          <div>
            <ChevronLeftIconOutline
              width={36}
              height={36}
              fill={colors.grey[400]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
