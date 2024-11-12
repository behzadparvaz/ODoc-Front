import { Button } from '@com/_atoms/NewButton';
import { ChevronLeftIconOutline, StarIcon } from '@com/icons';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import { persianDate } from '@utilities/persianDate';
import { useEffect, useState, useCallback, useMemo } from 'react';
import AddNewComment from './AddNewComment';
import classNames from 'classnames';
import moment from 'jalali-moment';

interface Comment {
  id: string;
  rating: number;
  createdAt: string;
  comment: string;
}

interface CommentsProps {
  comments?: Comment[];
  onSubmitReview?: () => void;
}

const Comments = ({
  comments = [],
  onSubmitReview = () => {},
}: CommentsProps) => {
  const { addModal } = useModal();
  const [isShowMoreComments, setIsShowMoreComments] = useState<boolean>(
    comments.length > 4,
  );

  const commentsList = useMemo(() => {
    return isShowMoreComments ? comments.slice(0, 4) : [...comments];
  }, [comments, isShowMoreComments]);

  const addNewCommentHandler = useCallback(() => {
    addModal({
      modal: AddNewComment,
      props: {
        onSubmitReview: () => {
          onSubmitReview();
        },
      },
    });
  }, [addModal, onSubmitReview]);

  const ShowMoreHandler = useCallback(() => {
    setIsShowMoreComments((prev) => !prev);
  }, []);

  return (
    <div className="bg-white px-4">
      <div className="flex items-center justify-between h-14">
        <h1 className="font-medium">نظر کاربران</h1>
        <Button onClick={addNewCommentHandler} variant="secondary" size="small">
          ارسال نظر
        </Button>
      </div>
      {comments.length > 0 && (
        <div className="w-full h-10">
          <span className="text-content-tertiary">{comments.length} نظر</span>
        </div>
      )}
      <div className="flex flex-col gap-y-2">
        {commentsList.map(
          ({ id, rating = 1, createdAt = '', comment = '' }) => (
            <div
              key={id}
              className={classNames('flex flex-col', { 'border-b py-2': true })}
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
                    date: moment(createdAt).format('MM/DD/YYYY HH:mm:ss A'),
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
          <ChevronLeftIconOutline
            width={36}
            height={36}
            fill={colors.grey[400]}
          />
        </div>
      )}
    </div>
  );
};

export default Comments;
