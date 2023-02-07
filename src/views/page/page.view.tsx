import React, { useEffect } from "react";

import { Flex } from "@chakra-ui/react";

import useQueryProject from "../../hooks/project.hook";

const MultipartComponent = React.lazy(
  () => import("de_common_ui/MultipartComponent")
);
const Button = React.lazy(() => import("de_common_ui/Button"));
interface PageViewProps {
  projectId: string;
}

const PageView: React.FC<PageViewProps> = ({
  projectId,
}: PageViewProps): JSX.Element => {
  const {
    data: buildingData,
    loading: isLoadingDataProject,
    error: dataError,
  } = useQueryProject(projectId);

  useEffect(() => {
    if (!isLoadingDataProject && buildingData) {
      console.log(buildingData);
    }
    if (dataError) console.log(dataError);
  }, [isLoadingDataProject, buildingData]);

  return (
    <Flex>
      <h1>Origin Integration Boilerplate v2</h1>
      <h2>React, Typescript, Chakra, Webpack remote</h2>
      <Button variant="primary">Test Button</Button>
      <MultipartComponent />
    </Flex>
  );
};

export default PageView;
