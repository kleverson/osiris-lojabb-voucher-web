import type { ReactElement } from "react";

type props = {
  children: ReactElement;
};

const Layout = ({ children }: props) => {
  return <>{children}</>;
};

export default Layout;
