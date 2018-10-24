import { PixelsScene } from "@root/scenes/PixelsScene";
import { ProfileScene } from "@root/scenes/ProfileScene";
import * as React from "react";

export interface IRoute {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

const routes: IRoute[] = [
  {
    component: () => <div>Search</div>,
    exact: true,
    path: "/"
  },
  {
    component: PixelsScene,
    exact: true,
    path: "/:username/pixels/:id/:type?"
  },
  {
    component: ProfileScene,
    exact: true,
    path: "/:username"
  }
];

export default routes;
