import axios from 'axios';

const PARSI_API_URL = process.env.NEXT_PUBLIC_PARSI_MAP_API_URL;
const parsiMapAccessToken = process.env.NEXT_PUBLIC_PARSI_MAP_API_TOKEN;

interface ISearchBody<T> {
  district: T;
  search_text: string;
}

interface IReverseLocationBody<T> {
  location: T;
}

// ------------ parsi map api call ----------------
export const parsiMapSearchAddress = async (body: ISearchBody<string>) => {
  delete axios.defaults.headers.common['Authorization'];
  const data = await axios.get(
    `${PARSI_API_URL}geocode/forward?district=${body.district}&key=${parsiMapAccessToken}&search_text=${body.search_text}&only_in_district=false`,
  );
  return await data?.data;
};

export const parsiMapReverseLocation = async (
  body: IReverseLocationBody<string>,
) => {
  delete axios.defaults.headers.common['Authorization'];
  const data = await axios.get(
    `${PARSI_API_URL}geocode/reverse?key=${parsiMapAccessToken}&location=${body.location}&plate=true&subdivision=true&local_address=true&approx_address=true`,
  );
  return await data?.data;
};
