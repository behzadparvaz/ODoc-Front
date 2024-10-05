export const SkeletonSvg = (
  w,
  h,
) => ` <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
  <linearGradient id="g">
  <stop offset="20%" stopColor="#e2e2e2" />
  <stop offset="50%" stopColor="#efefef" />
  <stop offset="70%" stopColor="#e2e2e2" />
  </linearGradient>
</defs>
<rect rx="12" ry="12" width="${w}" height="${h}" fill="#e2e2e2" />
<rect rx="12" ry="12" id="r" width="${w}" height="${h}" fill="url(#g)" />
<animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer?.from(str)?.toString('base64')
    : window?.btoa(str);
