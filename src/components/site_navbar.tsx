import * as React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

interface NavbarProps {}
interface NavbarState {
  mobileActive: boolean;
}

class Navbar extends React.Component<NavbarProps, NavbarState> {
  state = {
    mobileActive: false,
  };

  handleBurgerClick = () => {
    this.setState((state) => ({
      mobileActive: !state.mobileActive,
    }));
  };

  render(): React.ReactNode {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <StaticImage
              src="../images/copperstate_logo.jpg"
              alt="Copperstate4Wheelers Logo"
            />
            <span className="title is-4">Copperstate4Wheelers</span>
          </Link>

          <a
            role="button"
            className={
              "navbar-burger " + (this.state.mobileActive ? "is-active" : "")
            }
            aria-label="menu"
            aria-expanded="false"
            data-target="sitenav"
            onClick={this.handleBurgerClick}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div /*navbar-brand*/>

        <div
          className={
            "navbar-menu " + (this.state.mobileActive ? "is-active" : "")
          }
        >
          <div className="navbar-start"></div>
          <div className="navbar-end">
            <Link className="navbar-item" to="/about">
              About
            </Link>
            <Link className="navbar-item" to="/contact">
              Contact
            </Link>
            <Link className="navbar-item" to="/events">
              Events
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
