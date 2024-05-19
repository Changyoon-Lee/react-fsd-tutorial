import { createElement } from "react";
import { HomePage } from "./home-page.ui";
import { pathKeys } from "~shared/lib/react-router";

export const homePageRoute = {
    path: pathKeys.home(),
    element: createElement(HomePage)
}