import { useRouter } from 'next/router';
import { routeList } from '@routes/routeList';

export default function useCheckPage() {
  const { asPath } = useRouter();
  const categoryRoute = asPath?.includes(routeList.category);
  const searchRoute = asPath?.includes(routeList.search);
  const isInSearchPage = searchRoute;
  const isCategoryRoute = categoryRoute;

  return {
    isInSearchPage,
    isCategoryRoute,
  };
}
