import React from 'react';
import dynamic from 'next/dynamic';

const ProdictListPage = dynamic(
  () => import('@com/_organisms/ProdictListPage'),
);

type Props = {};

export default function SearchPage({}: Props) {
  return (
    <div>
      <ProdictListPage />
    </div>
  );
}
