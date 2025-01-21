import { useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes.config";

const MainRoutes = () => {
  const routesChildren = useMemo(() => {
    return routes.map((route, index) => (
      <Route key={index} path={route.path} element={<route.component />} />
    ));
  }, []);

  return <Routes>{routesChildren}</Routes>;
};

export default MainRoutes;
