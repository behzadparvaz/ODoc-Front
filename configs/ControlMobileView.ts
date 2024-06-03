const platform = process.env.NEXT_PUBLIC_PLATFORM;
const platformSSR = process.env.PLATFORM;

export const shouldShowMobileMode = platform === 'web' || platform === 'android' || platform === 'ios';
export const shouldShowMobileModeSSR = platformSSR === 'web' || platformSSR === 'android' || platformSSR === 'ios';

export const mobileModeWidth = 600;

export const mobileModeMaxWidthClassName = 'max-w-' + mobileModeWidth;
