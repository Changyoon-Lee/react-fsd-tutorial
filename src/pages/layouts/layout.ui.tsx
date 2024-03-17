import { useSuspenseQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import { pathKeys } from "~shared/lib/react-router";

export function GenericLayout() {
  // const { data } = useSuspenseQuery()
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container">
        <NavLink className="logo-font" to={pathKeys.home()}>
          conduit
        </NavLink>
        <span className="attribution">
          An interactive learning project from{" "}
          <a href="https://thinkster.io" target="_blank" rel="noreferrer">
            Thinkster
          </a>
          . Code &amp; design licensed under MIT.
        </span>
      </div>
    </footer>
  );
}
