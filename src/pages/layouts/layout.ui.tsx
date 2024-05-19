import { useSuspenseQuery } from "@tanstack/react-query";
import { NavLink, Outlet } from "react-router-dom";
import { sessionQueries } from "~entities/session";
import { pathKeys } from "~shared/lib/react-router";

export function GenericLayout() {
  const { data } = useSuspenseQuery(sessionQueries.userService.queryOptions());
  return (
    <>
      <div className="-z-20 fixed inset-0 bg-cover bg-fixed bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1643228995868-bf698f67d053?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}></div>
      <div className="fixed inset-0 -z-10 bg-black/70"></div>
      <div className="sticky z-40 inset-x-0 top-0 flex justify-between max-w-3xl bg-clip-padding bg-white/10 back backdrop-blur-md border-stone-100 ring-1 ring-stone-400 h-12 mx-auto p-2 rounded-b-md font-bold text-stone-50">
        {data ? <div>유저네비게이션부분</div> : <div>게스트네비게이션</div>}
      </div>

      <div className="max-w-5xl w-screen mx-auto h-[1000px]">
        <Outlet />
        <div className="w-max">o</div>
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  return (
    <footer className="absolute inset-x-0 text-right bg-stone-50 bg-opacity-90">
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
