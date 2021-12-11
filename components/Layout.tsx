import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return <div className="relative">{children}</div>;
}

export default Layout;
