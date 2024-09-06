import React from 'react';
import { mobileModeMaxWidthClassName, shouldShowMobileMode } from '@configs/ControlMobileView';

const Footer: React.FC = ({ children }) =>
  <div
    className={`fixed inset-x-0 px-3 md:px-6 bottom-3 md:bottom-6 truncate z-10 ${
      shouldShowMobileMode ? mobileModeMaxWidthClassName + ' mx-auto' : ''
    } `}
  >
    {children}
  </div>

export default Footer
