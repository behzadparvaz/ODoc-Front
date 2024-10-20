import { colors } from '@configs/Theme';
import { makeStyles, Theme } from '@material-ui/core';
interface Props {
  width: number | string;
  height: number | string;
  minHeight?: number | string;
  padding?: number | string;
}
export const useModalCenterStyles = makeStyles<Theme, Props>((theme) => ({
  centerModalContainer: {
    width: (props) => props.width,
    height: (props) => props.height,
    minHeight: (props) => props.minHeight,
    backgroundColor: colors.white,
    borderRadius: '12px',
    padding: (props) => props.padding || '24px',
    position: 'relative',
    '& .modalActions': {
      marginTop: 'auto',
      alignSelf: 'flex-end',
      '& button': {
        fontSize: '1.125rem !important',
      },
      '& .saveBtn': {
        width: 'auto',
        height: '48px',
        marginRight: '8px',
        paddingRight: '36px',
        paddingLeft: '36px',
      },
      '& .backBtn': {
        width: '133px',
        height: '48px',
        border: `1px solid ${theme.palette.grey[400]}`,
      },
    },
  },
}));

export const useModalFullMobileStyles = makeStyles((theme) => ({
  container: {
    direction: 'rtl',
    position: 'fixed',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: colors.white,
    overflow: 'hidden',
    opacity: '1 !important',
    '& .left': {},
  },
}));

interface IProps {
  height: number | string;
  minHeight?: number | string;
  padding?: number | string;
  bottom?: number | string;
}
export const useModalBottomMobileStyles = makeStyles<Theme, IProps>((theme) => ({
  container: {
    position: 'fixed',
    width: '100%',
    height: ({ height }) => (height ? height : '100%'),
    minHeight: ({ minHeight }) => (minHeight ? minHeight : 'fit-content'),
    padding: ({ padding }) => (padding ? padding : '16px'),
    left: '50%',
    transform:'translateX(-50%)!important',
    bottom: ({ bottom }) => (bottom ? bottom : 0),
    background: colors.white,
    overflowX: 'hidden',
    overflowY: 'auto',
    borderRadius: '10px 10px 0 0',
    '&.carousel-modal': {
      direction: 'rtl !important' as 'rtl',
    },
  },
}));
