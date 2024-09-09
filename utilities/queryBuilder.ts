const queryBuilder = (fieldName: string, value) => {
  // const operator = index > 0 ? '&' : '';
  return value !== '' && value ? fieldName + '=' + encodeURIComponent(value) + '&' : '';
};

export const builder = (query = {}) => {
  try {
    let temp = '';
    Object?.keys(query)?.forEach?.((key, i) => {
      temp += queryBuilder?.(key, query?.[key]);
    });
    if (temp?.length > 0) {
      temp = temp?.substring(0, temp?.length - 1); //chop off last "&"
      temp = '?' + temp;
    }
    return temp;
  } catch (err) {
    console.log(err);
  }
};
export const searchParamToObject = (searchParam: string) => {
  try {
    let pairs = searchParam?.split('?')?.join('')?.split('&'),
      obj = {},
      pair,
      i;
    for (i in pairs) {
      if (pairs?.[i] === '') continue;
      pair = pairs?.[i]?.split('=');
      obj[decodeURIComponent(pair?.[0])] = decodeURIComponent(pair?.[1]);
    }
    return obj;
  } catch (err) {
    console.log(err);
  }
};

// export const builder = (parameters) => {
//   let qs = '';
//   for (var key in parameters) {
//     var value = parameters[key];
//     qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
//   }
//   if (qs.length > 0) {
//     qs = qs.substring(0, qs.length - 1); //chop off last "&"
//     qs = '?' + qs;
//   }
//   return qs;
// };

// export const builder = (query = {}) => new URLSearchParams(query)?.toString();
// export const builder = (params = {}) => {
//   var esc = encodeURIComponent;
//   let query = Object.keys(params)
//     .map((k) => esc(k) + '=' + esc(params[k]))
//     .join('&');
//   return query ? '?' + query : '';
// };
