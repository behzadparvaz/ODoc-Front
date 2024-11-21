import React from 'react';
import Link, { LinkProps } from 'next/link';

const NextLink = ({
  prefetch,
  ...otherProps
}: React.PropsWithChildren<LinkProps>) => {
  return (
    <Link draggable="false" {...otherProps} prefetch={prefetch ?? false}>
      {otherProps.children}
    </Link>
  );
};

export default NextLink;
