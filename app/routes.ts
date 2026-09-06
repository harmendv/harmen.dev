import { type RouteConfig, route, index, layout } from "@react-router/dev/routes";

export default [
  layout("./layouts/SiteLayout.tsx", [index("./pages/Index.tsx")]),
  layout("./layouts/LegalLayout.tsx", [
    route("privacy", "./pages/Privacy.tsx"),
    route("terms", "./pages/Terms.tsx"),
  ]),
] satisfies RouteConfig;
