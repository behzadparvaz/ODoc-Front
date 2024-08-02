// import { ButtonProps } from 'antd/lib/button';
import { EditIcon, PlusIconOutline } from '@com/icons';
import { colors } from '@configs/Theme';
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  createRef,
} from 'react';
// import { EditIcon, PlusIcon } from '../icons';

type Props = {
  name: string;
  previewImageUrl?: string | ArrayBuffer;
  setPreviewImageUrl?: Dispatch<SetStateAction<any>>;
  defaultImage?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  // addButtonProps?: ButtonProps;
  // changeButtonProps?: ButtonProps;
  // removeButtonProps?: ButtonProps;
  disabled?: boolean;
  title: string;
  className?: string;
};

function ImageUpload({
  name,
  className = '',
  previewImageUrl,
  setPreviewImageUrl,
  // addButtonProps,
  // changeButtonProps,
  // removeButtonProps,
  inputClassName,
  inputWrapperClassName,
  disabled = false,
  title = '',
}: Props) {
  const [fileState, setFile] = useState(null);
  const [imageUrlState, setImageUrlState] = useState(null);

  let fileInput = createRef<HTMLInputElement>();

  useEffect(() => {
    previewImageUrl
      ? setImageUrlState(previewImageUrl)
      : setImageUrlState(null);
  }, [previewImageUrl]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImageUrlState(reader.result);
    };
    setPreviewImageUrl((prev) => ({
      ...prev,
      [name]: file,
    }));
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    setImageUrlState(null);
    fileInput.current.value = null;
    setPreviewImageUrl((prev) => ({
      ...prev,
      [name]: '',
    }));
  };
  return (
    <div className={`fileUpload ${className}`}>
      <input
        name={name}
        type="file"
        onChange={handleImageChange}
        ref={fileInput}
        className={'!hidden'}
        disabled={disabled}
      />
      <div className="flex justify-between mb-2 items-center">
        <div className="text-sm font-semibold">{title}</div>
        {(fileState === null && !previewImageUrl) || disabled ? (
          <span
            className=" text-2xs cursor-pointer text-grey-400 flex gap-x-1 items-center"
            onClick={() => handleClick()}
          >
            <PlusIconOutline width={12} height={12} fill={colors.grey[800]} />
            اضافه کردن تصویر
          </span>
        ) : (
          <span
            className=" text-2xs cursor-pointer text-grey-400 flex gap-x-1 items-center"
            onClick={() => handleClick()}
          >
            <EditIcon width={12} height={12} stroke="#FF6136" />
            ویرایش تصویر
          </span>
        )}
      </div>
      <div
        className={`mx-auto ${!imageUrlState ? 'border-grey-200 border-2 h-44 border-dashed items-center justify-center flex text-sm font-semibold text-grey-300' : ''} overflow-hidden rounded-xl ${
          inputWrapperClassName ?? ''
        }`}
      >
        {imageUrlState ? (
          <img
            src={imageUrlState as string}
            alt="..."
            className={inputClassName ?? ''}
          />
        ) : (
          title
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
