import MainLayout from '@com/_template/MainLayout';
import NextImage from '@com/_core/NextImage';
import Button from '@com/_atoms/Button';
import {
  useAddProductToBasket,
  useDeleteCurrentBasket,
  useDeleteProductBasket,
  useGetCurrentBasket
} from '@api/basket/basketApis.rq';
import React, { useMemo } from 'react';
import AddButton from '@com/_atoms/AddButton';

const Page = () => {

  // const { data: basket } = useGetProducts();
  const { data: basket, refetch: refetGetBasket } = useGetCurrentBasket();
  const { mutate: addToCart, isLoading: isAddingToCart } = useAddProductToBasket({
    onSuccess: () => {
      refetGetBasket()
    }
  });
  const { mutate: popProductOfCart } = useDeleteProductBasket();
  const { mutate: deleteBasket } = useDeleteCurrentBasket();

  const products = useMemo(() => basket?.products ?? [], [basket])

  return <MainLayout className="px-6" title="سبد خرید" hasBottomNavigation={false}>
    <div className="relative h-[calc(100vh-79px)]">
      <div className="flex flex-col py-4">
        {
          products.map(pr =>
            <ProductCard prInfo={{ ...pr }}
                         key={pr.irc}
                         isLoading={isAddingToCart}
                         onChangeCount={({ irc, quantity }) => addToCart({
                           type: 'IRC',
                           orderType: 'OTC',
                           irc: irc,
                           quantity: quantity
                         })}
                         onDeleteProduct={({ irc }) => popProductOfCart({ type: 'IRC', irc: irc })}/>
          )
        }
      </div>

      <Address />

      <div className="sticky bottom-0 bg-white px-6 py-4 -mx-6 flex justify-between gap-4">
        <Button variant={'primary'} className="flex-1" size={'large'}>ثبت سفارش</Button>
        <Button variant={'primary'}
                className="flex-1"
                size={'large'}
                buttonType={'outlined'}
                handleClick={deleteBasket}>حذف سبد خرید</Button>
      </div>
    </div>
  </MainLayout>;
};

export default Page;

type ProductCardProps<PrT> = {
  prInfo: PrT
  isLoading?: boolean;
  onChangeCount?: (prInfo: PrT) => void,
  onDeleteProduct?: (prInfo: PrT) => void
}

const ProductCard: React.FC<ProductCardProps<ProductInBasket>> =
  ({ prInfo, isLoading, onChangeCount, onDeleteProduct }) => {

    const onChange = (count: number) => {
      if (count > 0) {
        onChangeCount?.({ ...prInfo, quantity: count });
      } else {
        onDeleteProduct?.(prInfo);
      }
    };

    return <div className="p-3 rounded border-b border-grey-100 flex gap-3">
      <div className=""><NextImage src={prInfo?.image ?? ''} width={70} height={70} alt={prInfo.name}/></div>
      <div className="flex-1 flex gap-3 items-center">
        <h3 className="flex-1">{prInfo.name}</h3>
        <AddButton count={prInfo.quantity} onChangeCount={onChange} isLoading={isLoading}/>
      </div>
    </div>;
  };


const Address = () => {
  return (
    <div className='border border-grey-200 rounded-lg py-3 px-4'>
      <h3 className='font-medium text-right'>ارسال به</h3>
      <div className='text-grey-400 font-normal py-2'>
        کوی نصر، خیابان صائمی، خیابان ایزدی، واحد ۱۲، پلاک ۱۴
      </div>
      <div className='flex justify-end'>
        <Button buttonType={'contained'} className={'bg-grey-100 !rounded-full !h-11 mt-3'}>ویرایش یا تغییر آدرس</Button>
      </div>
    </div>
  )
}
