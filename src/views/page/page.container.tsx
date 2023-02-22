import React, { useEffect } from "react";

import PageView from "./page.view";
import useQueryProject from "../../hooks/project.hook";

const ViewWrapper = React.lazy(() => import("de_common_ui/ViewWrapper"));
interface SZTContainerProps {
  projectId: string;
}

const SZTContainer: React.FC<SZTContainerProps> = ({
  projectId,
}): JSX.Element => {
  // Example query to prove data can be consumed as a remote and standalone app
  const {
    data: buildingData,
    loading: isLoadingDataProject,
    error: dataError,
  } = useQueryProject(projectId);

  useEffect(() => {
    if (!isLoadingDataProject && buildingData) {
      console.log("buildingData");
      console.log(buildingData);
    }
    if (dataError) console.log(dataError);
  }, [isLoadingDataProject, buildingData]);
  return (
    <ViewWrapper>
      <PageView projectId={projectId} />
    </ViewWrapper>
  );
};

export default SZTContainer;
