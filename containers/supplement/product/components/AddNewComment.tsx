import { usePostSupplementReview } from '@api/supplement/plp/plp.rq';
import { Button } from '@com/_atoms/NewButton';
import { TextAreaInput } from '@com/_atoms/NewTextArea';
import { StarIcon } from '@com/icons';
import ActionBar from '@com/Layout/ActionBar';
import { BottomModalContainer } from '@com/modal/containers/bottomMobileContainer';
import { colors } from '@configs/Theme';
import useModal from '@hooks/useModal';
import useNotification from '@hooks/useNotification';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AddNewComment = ({ onSubmitReview = () => {} }) => {
  const router = useRouter();
  const productId = router.query.productId as string;
  const { removeLastModal } = useModal();

  const [state, setState] = useState({
    rate: 1,
    comment: '',
  });

  const { openNotification } = useNotification();

  const handleStarClick = (index) => {
    setState((prevState) => ({
      ...prevState,
      rate: index + 1,
    }));
  };

  const { mutate: postSupplementReview, isPending: isPendingPostingReview } =
    usePostSupplementReview({
      onSuccess: () => {
        openNotification({
          type: 'success',
          message: 'نظر شما با موفقیت ارسال شد',
          notifType: 'successOrFailedMessage',
        });
        onSubmitReview();
        removeLastModal();
      },
      onError: () => {
        openNotification({
          type: 'error',
          message: 'خطایی رخ داده است',
          notifType: 'successOrFailedMessage',
        });
      },
    });

  const handleSubmit = () => {
    postSupplementReview({
      productId: productId,
      comment: state.comment,
      rating: state.rate,
    });
  };

  return (
    <BottomModalContainer
      className="relative"
      height={'auto'}
      hasCloseButton={isPendingPostingReview ? false : true}
      title="نظر شما"
    >
      <div className="px-4 mb-4">
        <p className="text-sm text-content-tertiary text-center mt-4">
          به این محصول چه امتیازی میدهید؟
        </p>
        <div className="flex items-center cursor-pointer justify-center h-10 mt-3">
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <div key={index} onClick={() => handleStarClick(index)}>
                <StarIcon
                  width={40}
                  height={40}
                  fill={
                    index < state.rate ? colors.yellow[400] : colors.grey[400]
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <TextAreaInput
            id="description"
            onChange={(e) => {
              setState({
                ...state,
                comment: e.target.value,
              });
            }}
            labelClassName="text-base font-medium"
            inputClassName="rounded-md"
            label="متن نظر"
            placeholder="نظر خود را در مورد این محصول اینجا بنویسید"
            rows={5}
            value={state.comment}
          />
        </div>
      </div>
      <div className="h-[1px] bg-border-primary w-full" />
      <div className="flex justify-center items-center">
        <Button
          onClick={handleSubmit}
          disabled={isPendingPostingReview}
          className="w-full my-5"
          type="submit"
        >
          افزودن نظر
        </Button>
      </div>
    </BottomModalContainer>
  );
};

export default AddNewComment;
