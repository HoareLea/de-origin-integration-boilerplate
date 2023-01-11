// Third party typings go here
declare const AppVersion: string;
declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module "de_common_ui/styles";
declare module "de_origin/*";
