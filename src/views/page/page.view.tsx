import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import {
  ErrorFallback,
  errorHandler,
} from "@components/ErrorFallback/ErrorFallback.component";

import useQueryProject from "../../hooks/project.hook";

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
    <Flex flexDirection="column" alignItems="start">
      <Box as="header" mb="8">
        <Heading as="h1" mb="2">
          Origin Integration Boilerplate
        </Heading>
        <Text as="strong">Federated Remote App</Text>
        <Text>React, Typescript, Apollo, Chakra UI</Text>
      </Box>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        <Button variant="primary">Test Button from de-common-ui</Button>
      </ErrorBoundary>
    </Flex>
  );
};

export default PageView;
