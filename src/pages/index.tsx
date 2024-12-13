import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

import "@fontsource/noto-sans";
import "../styles/index.scss";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <header>
        <p>Something in the header</p>
      </header>
      <main>
        <h1 className="title is-1">Title</h1>
        <div className="container">
          <div className="notification is-primary">Some content</div>
        </div>
        <p>main content area</p>
      </main>
      <footer>
        <p>something in the footer</p>
      </footer>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Hello World Page</title>
    <meta name="description" content="Hello World Description" />
  </>
);
