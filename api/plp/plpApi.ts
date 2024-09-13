import request from '@api/request';
import { builder } from '@utilities/queryBuilder';

export const GetSearchProducts = async (body) => {
  const params=builder(body)
  return await request.get(
    `Product/management/SearchResult${params}`,
    body,
  );
};
