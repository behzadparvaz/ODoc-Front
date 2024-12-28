import { ProductType } from '@constant/ProductType';
import { routeList } from '@routes/routeList';
import { useRouter } from 'next/router';

type ProductTypeId = ProductType.RX | ProductType.Otc | ProductType.RequestOrder | ProductType.Supplement;

interface INavigateToProduct {
    ProductTypeId: ProductTypeId;
    item: any;
}
const useProductNavigation = () => {
    const { push } = useRouter();

    const navigateToPdp = ({ item, ProductTypeId }: INavigateToProduct) => {
        if (ProductTypeId === ProductType.RX) {
            console.error('not implemented');
            return null
        }
        if (ProductTypeId === ProductType.RequestOrder) {
            console.error('not implemented');
            return null
        }
        if (ProductTypeId === ProductType.Otc) {
            return push({
                pathname: `${routeList?.searchProductPage}`,
                query: {
                    irc: item.irc,
                },
            });
        }
        if (ProductTypeId === ProductType.Supplement) {
            return push({
                pathname: `${routeList?.supplementProduct}/${item.irc}`,
            });
        }


    };
    return { navigateToPdp };
};
export default useProductNavigation;