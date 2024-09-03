import React from 'react';
import dynamic from 'next/dynamic';

const ProdictListPage = dynamic(
  () => import('@com/_organisms/ProdictListPage'),
);

type Props = {};

export default function SearchPage({}: Props) {
  const products = [
    {
      name: 'ژلوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
    {
      name: 'استامینوفن',
    },
  ];
  return (
    <div>
      <ProdictListPage products={products} />
    </div>
  );
}
