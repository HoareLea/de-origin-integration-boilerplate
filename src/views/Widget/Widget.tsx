import React from "react";

const ProjectWidget = React.lazy(() => import("de_common_ui/ProjectWidget"));

const Widget: React.FC<any> = (): JSX.Element => {
  return <ProjectWidget title="Boilerplate example widget">Info</ProjectWidget>;
};

export default Widget;
