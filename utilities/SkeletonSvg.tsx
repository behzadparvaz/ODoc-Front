export const SkeletonSvg = (w, h) => {
  const radius = 12;
  return `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop offset="20%" stop-color="#E1E3E3" />
        <stop offset="50%" stop-color="#CACCCC" />
        <stop offset="70%" stop-color="#E1E3E3" />
      </linearGradient>
    </defs>
    <rect rx="${radius}" ry="${radius}" width="${w}" height="${h}" fill="#E1E3E3" />
    <rect rx="${radius}" ry="${radius}" id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite" />
  </svg>`;
};

export const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer?.from(str)?.toString('base64')
    : window?.btoa(str);
