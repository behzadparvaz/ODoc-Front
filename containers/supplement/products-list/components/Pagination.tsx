import { useRouter } from 'next/router';
import classNames from 'classnames';

import { ChevronLeftIconOutline, ChevronRightIcon } from '@com/icons';
import ActionBar from '@com/Layout/ActionBar';
import { colors } from '@configs/Theme';

type PaginationProps = {
  lastPage: number;
};

const Pagination = ({ lastPage }: PaginationProps) => {
  const { pathname, query, push } = useRouter();

  const currentPage = Number(query?.page ? query?.page : 10);
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;

  const handleChangepageQuery = (pageNumber: number) => {
    push(
      {
        pathname: pathname,
        query: { ...query, page: pageNumber },
      },
      undefined,
      { shallow: true },
    );
  };

  const sharedClassName =
    'h-8 w-8 text-xs font-normal text-content-secondary flex items-center justify-center';

  return (
    <ActionBar type="singleAction">
      <div className="w-full h-full flex items-center justify-center">
        <div
          className={classNames(sharedClassName, 'cursor-pointer')}
          onClick={() => {
            if (currentPage > 1) handleChangepageQuery(previousPage);
          }}
        >
          <ChevronRightIcon
            width={24}
            height={24}
            fill={currentPage === 1 ? colors?.gray[400] : colors?.black}
          />
        </div>

        <span
          className={classNames(
            sharedClassName,
            'cursor-pointer',
            currentPage === 1 &&
              'bg-surface-secondary rounded-full !text-content-primary !font-medium',
          )}
          onClick={() => handleChangepageQuery(1)}
        >
          1
        </span>

        {currentPage > 3 && (
          <span className={classNames(sharedClassName, 'cursor-default')}>
            ...
          </span>
        )}

        {currentPage > 2 && (
          <span
            onClick={() => handleChangepageQuery(previousPage)}
            className={classNames(sharedClassName, 'cursor-pointer')}
          >
            {previousPage}
          </span>
        )}

        {currentPage > 1 && (
          <span
            className={classNames(
              sharedClassName,
              'cursor-pointer bg-surface-secondary rounded-full !text-content-primary !font-medium',
            )}
          >
            {currentPage}
          </span>
        )}

        {currentPage < lastPage - 1 && (
          <span
            onClick={() => handleChangepageQuery(nextPage)}
            className={classNames(sharedClassName, 'cursor-pointer')}
          >
            {nextPage}
          </span>
        )}

        {currentPage < lastPage - 2 && (
          <span className={classNames(sharedClassName, 'cursor-default')}>
            ...
          </span>
        )}
        {currentPage !== lastPage && (
          <span
            className={classNames(
              sharedClassName,
              'cursor-pointer',
              currentPage === lastPage &&
                'bg-surface-secondary rounded-full !text-content-primary !font-medium',
            )}
            onClick={() => handleChangepageQuery(lastPage)}
          >
            {lastPage}
          </span>
        )}

        <div
          className={classNames(sharedClassName, 'cursor-pointer')}
          onClick={() => {
            if (currentPage < lastPage) handleChangepageQuery(nextPage);
          }}
        >
          <ChevronLeftIconOutline
            width={24}
            height={24}
            fill={currentPage === lastPage ? colors?.gray[400] : colors?.black}
          />
        </div>
      </div>
    </ActionBar>
  );
};
export default Pagination;
