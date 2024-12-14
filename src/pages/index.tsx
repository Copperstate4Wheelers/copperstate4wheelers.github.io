import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Navbar from "../components/site_navbar";

import "@fontsource/noto-sans";
import "../styles/index.scss";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="container is-fluid">
        <section className="section">
          <h1 className="title is-3">Welcome</h1>
          <p>main content area</p>
          <p>Some information about the club.</p>
        </section>

        <section className="section">
          <h1 className="title is-3">Upcoming Events</h1>
        </section>
      </main>
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Copyright &copy; 2024, Copperstate4Wheelers</p>
        </div>
      </footer>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <html lang="en" data-theme="light" />
    <title>Copperstate4Wheelers</title>
    <meta name="description" content="Something" />
  </>
);
