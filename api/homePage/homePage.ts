import request from '@api/request';

export const GetSliderAndCarouselData = async () =>
  await request.get(`http://5.34.204.173:35211/udp/Shop/Display.json`);
