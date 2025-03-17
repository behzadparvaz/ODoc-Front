/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { forwardRef, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeLastModalAction } from '@redux/modal/modalActions';
import { useMediaQuery } from '@hooks/useMediaQuery';
import {
  mobileModeMaxWidthClassName,
  shouldShowMobileMode,
} from '@configs/ControlMobileView';
import { ModalType } from '@utilities/interfaces/modal';

let modalInfo: any;

const ModalCreator = forwardRef<HTMLDivElement, any>((prop, ref) => {
  const modals = useSelector<any, ModalType>((state) => state.modals);
  const { desktopSize } = useMediaQuery();
  const dispatch = useDispatch();
  const [hardwareBackHistory, setHardwareBackHistory] = useState(true);

  const { beforePopState, push } = useRouter();

  const closeEvent = useCallback(() => {
    dispatch(removeLastModalAction());
  }, []);

  const close = useCallback(() => {
    // if (modalInfo[0].props != undefined) {
    //   if (modalInfo[0].props.beforeUrl != undefined) {
    //     history.pushState({}, null, modalInfo[0].props.beforeUrl);
    //   }
    //   history.pushState({}, null, modalInfo[modalInfo.length - 1].props.beforeUrl);
    // }

    setHardwareBackHistory(false);
    // window.history.back();

    dispatch(removeLastModalAction());
    setTimeout(() => setHardwareBackHistory(true), 0);
  }, []);

  useEffect(() => {
    if (modals.length > 0) {
      modalInfo = modals;
    }
    beforePopState(() => !modals.length);
  }, [modals.length]);

  useEffect(() => {
    const nextDiv = document.querySelector('#__next') as HTMLDivElement | null;
    const html = document.getElementsByTagName('html')[0] as HTMLElement;
    window.document.body.style.paddingRight = modals.length
      ? document.body.offsetWidth - document.body.clientWidth + 'px'
      : '0';
    html.style.overflowY = 'hidden';
    window.document.body.style.overflowY = modals.length ? 'hidden' : 'auto';
    nextDiv.setAttribute('aria-hidden', modals.length ? 'true' : 'false');
    if (modals.length && hardwareBackHistory) {
      window.addEventListener('popstate', closeEvent);
    }

    // if (!modals.length) {
    //   modalContainer.current?.classList?.remove(
    //     'modal_overlay',
    //     'overlay-blur'
    //   );
    // }

    return () => window.removeEventListener('popstate', closeEvent);
  }, [modals, hardwareBackHistory]);

  return createPortal(
    <>
      {modals.length > 0
        ? modals.map((modal) => {
            return (
              <div
                ref={ref}
                aria-modal="true"
                role="dialog"
                tabIndex={-1}
                key={modal.id}
                className={`fixed left-0 right-0 top-0 bottom-0 w-screen h-screen flex justify-center items-center overflow-auto ${
                  shouldShowMobileMode
                    ? mobileModeMaxWidthClassName + ' mx-auto'
                    : ''
                } ${modal?.props?.hasBlurOverlay ? 'modal_overlay_transition modal_overlay overlay-blur' : ''}`}
                style={{
                  backgroundColor: modal?.props?.hasBlurOverlay
                    ? 'rgba(0,0,0,0.7)'
                    : 'rgba(0,0,0,0.4)',
                  direction: 'ltr',
                  ...(desktopSize
                    ? { zIndex: 1301 + modal.id }
                    : { zIndex: 1000 + modal.id }),
                }}
                onClick={close}
              >
                <div
                  className={`modal_wrapper ${shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''}`}
                  style={
                    desktopSize
                      ? { zIndex: 1301 + modal.id }
                      : { zIndex: 1000 + modal.id }
                  }
                  onClick={(e) => e.stopPropagation()}
                >
                  <modal.modal
                    modalId={modal.id}
                    closeModal={close}
                    {...modal.props}
                  />
                </div>
              </div>
            );
          })
        : null}
    </>,
    document.getElementById('modal-root'),
  );
});

export default ModalCreator;
