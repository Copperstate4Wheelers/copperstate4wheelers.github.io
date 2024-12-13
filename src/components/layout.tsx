import * as React from "react";
import "@fontsource/noto-sans";
import "../styles/index.css";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <p>Layout</p>
      <div>{children}</div>
    </main>
  );
};

export default Layout;
