import { ReactNode } from 'react';

type FooterProps = {
  children: ReactNode;
};

const Footer = ({ children }: FooterProps) => (
  <div className="w-full flex justify-center items-center">{children}</div>
);

export default Footer;
