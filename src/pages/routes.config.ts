import { lazy } from "react";

export const ROUTES = {
  PHOTOS_GRID: "/photos/grid",
  PHOTOS_DETAILED_VIEW: "/photos/detailed",
};

const Photos = lazy(() => import("./Photos"));

const PhotosDetails = lazy(() => import("./PhotoDetails"));

export const routes = [
  {
    path: ROUTES.PHOTOS_GRID,
    component: Photos,
  },
  {
    path: `${ROUTES.PHOTOS_DETAILED_VIEW}/:id`,
    component: PhotosDetails,
  },
];
