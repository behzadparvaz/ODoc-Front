import { Button } from '@com/_atoms/NewButton';
import { ChevronLeftIconOutline, StarIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { persianDate } from '@utilities/persianDate';
import { useEffect, useState } from 'react';
import AddNewComment from './AddNewComment';
import classNames from 'classnames';

const Comments = ({ comments = [], onSubmitReview = () => {} }) => {
  const [commentsList, setCommentsList] = useState(comments.slice(0, 4)); // Get last 4 comments
  const { addModal } = useModal();
  const [isShowMoreComments, setIsShowMoreComments] = useState(
    comments.length > 4 ? true : false,
  );

  const addNewCommentHandler = () => {
    addModal({
      modal: AddNewComment,
      props: {
        onSubmitReview: () => {
          onSubmitReview();
        },
      },
    });
  };

  const ShowMoreHandler = () => {
    setIsShowMoreComments((prev) => !prev);
    setCommentsList([...comments]); // Show all comments when toggled
  };

  useEffect(() => {
    if (!isShowMoreComments) {
      setCommentsList([...comments]);
    } else {
      setCommentsList(comments.slice(0, 4));
    }
  }, [comments]);

  return (
    <div className="bg-white px-4">
      <div className="flex items-center justify-between h-14">
        <h1 className="font-medium">نظر کاربران</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={addNewCommentHandler}
            variant="secondary"
            size="small"
          >
            ارسال نظر
          </Button>
        </div>
      </div>
      {commentsList && (
        <div className="w-full h-10">
          <span className="text-content-tertiary">{comments.length} نظر</span>
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        {commentsList &&
          commentsList.map(
            ({ id, rating = 1, createdAt = '', comment = '' }, index) => (
              <div
                key={id}
                className={classNames('flex flex-col', {
                  'border-b py-2': index !== commentsList.length - 1,
                })}
              >
                <div className="flex justify-between items-center h-10">
                  <div className="flex">
                    {[...Array(rating)].map((_, index) => (
                      <StarIcon
                        key={index}
                        width={16}
                        height={16}
                        fill={colors.black}
                      />
                    ))}
                    {[...Array(5 - rating)].map((_, index) => (
                      <StarIcon
                        key={index + rating}
                        width={16}
                        height={16}
                        fill={colors.grey[400]}
                      />
                    ))}
                  </div>
                  <span className="text-content-tertiary align-middle">
                    {persianDate({
                      date: `${new Date(createdAt)}`,
                    })}
                  </span>
                </div>
                <p className="text-content-tertiary">{comment}</p>
              </div>
            ),
          )}
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
