import React, { useEffect } from "react";

import { Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";

import { AppProps } from "../../App.model";
import useQueryProject from "../../hooks/project.hook";

// import Button from "@components/Button/Button";
const Button = React.lazy(() => import("de_common_ui/Button"));

const PageView: React.FC<AppProps> = ({
  mode = "light",
  projectId,
}: AppProps): JSX.Element => {
  const { setColorMode } = useColorMode();
  // We shouldn't need to change the bg colour of the div if the document/body is transparent.
  // This is an example of consuming a host colorMode
  const bgColour = useColorModeValue("HLgray.50", "HLcharcoal.500"); // abstract these alterning values
  console.log(projectId);
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

  useEffect(() => setColorMode(mode), [mode]);
  return (
    <Flex bg={bgColour}>
      <h1>Origin Integration Boilerplate v2</h1>
      <h2>React, Typescript, Chakra, Webpack remote</h2>
      <Button variant="primary">Test Button</Button>
    </Flex>
  );
};

export default PageView;
