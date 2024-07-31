import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  createRef,
} from 'react';
import Button from '../Button';

type Props = {
  name: string;
  previewImageUrl?: string | ArrayBuffer;
  setPreviewImageUrl?: Dispatch<SetStateAction<any>>;
  defaultImage?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  addButtonProps?: any;
  changeButtonProps?: any;
  removeButtonProps?: any;
  disabled?: boolean;
};

function ImageUpload({
  name,
  previewImageUrl,
  setPreviewImageUrl,
  defaultImage = '/icons/placeholder.png',
  addButtonProps,
  changeButtonProps,
  removeButtonProps,
  inputClassName,
  inputWrapperClassName,
  disabled = false,
}: Props) {
  const [fileState, setFile] = useState(null);
  const [imageUrlState, setImageUrlState] = useState(null);

  let fileInput = createRef<HTMLInputElement>();

  // useEffect(() => {
  //   previewImageUrl
  //     ? setImageUrlState(previewImageUrl)
  //     : setImageUrlState(null);
  // }, [previewImageUrl]);

  // const handleImageChange = (e) => {
  //   e.preventDefault();
  //   let reader = new FileReader();
  //   let file = e.target.files[0];

  //   reader.onloadend = () => {
  //     setFile(file);
  //     setImageUrlState(reader.result);
  //   };
  //   setPreviewImageUrl((prev) => ({
  //     ...prev,
  //     [name]: file,
  //   }));
  //   reader.readAsDataURL(file);
  // };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleRemove = () => {
    setFile(null);
    setImageUrlState(defaultImage);
    fileInput.current.value = null;
    setPreviewImageUrl((prev) => ({
      ...prev,
      [name]: '',
    }));
  };
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };
  return (
    <div className="fileUpload">
      {/* <input
        name={name}
        type="file"
        onChange={handleImageChange}
        ref={fileInput}
        className={'!hidden'}
        disabled={disabled}
      />
      <div className={`mx-auto py-3 my-3 ${inputWrapperClassName ?? ''}`}>
        <img
          src={(imageUrlState as string) || defaultImage}
          alt="..."
          className={inputClassName ?? ''}
        />
      </div>
      <div className="flex items-center justify-center">
        {(fileState === null && !previewImageUrl) || disabled ? (
          <Button
            type="primary"
            onClick={() => handleClick()}
            {...addButtonProps}
            disabled={disabled}
          >
            انتخاب تصویر
          </Button>
        ) : (
          <>
            <Button
              className="mx-3"
              onClick={() => handleClick()}
              {...changeButtonProps}
            >
              ویرایش
            </Button>
            <Button
              danger
              onClick={() => handleRemove()}
              {...removeButtonProps}
            >
              حذف
            </Button>
          </>
        )}
      </div> */}
      <input
        name={name}
        type="file"
        onChange={handleFileChange}
        ref={fileInput}
        className={'!hidden'}
        disabled={disabled}
      />
      {preview && (
        <div className={`mx-auto py-3 my-3 ${inputWrapperClassName ?? ''}`}>
          <img src={preview as string} alt="Preview" width="100" height="100" />
        </div>
      )}
      <div className="flex items-center justify-center">
        <Button
          buttonType="outlined"
          variant="primary"
          className="ml-1"
          handleClick={() => handleClick()}
          // {...addButtonProps}
          disabled={disabled}
        >
          انتخاب تصویر
        </Button>
        <Button
          buttonType="outlined"
          variant="tertiary"
          handleClick={() => handleRemove()}
          // {...removeButtonProps}
        >
          حذف
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
