import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import "@fontsource/roboto";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <p style={{ fontFamily: "roboto" }}>about</p>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>About</title>
    <meta name="description" content="About Page" />
  </>
);
