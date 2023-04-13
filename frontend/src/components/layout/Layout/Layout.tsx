import React, { PropsWithChildren } from "react";
import Nav from '@/components/nav'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Nav />
      {children}
    </>
  );
};

export default Layout;
