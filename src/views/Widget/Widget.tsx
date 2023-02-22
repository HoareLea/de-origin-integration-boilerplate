import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Flex } from "@chakra-ui/react";
import {
  ErrorFallback,
  errorHandler,
} from "@components/ErrorFallback/ErrorFallback.component";

const ProjectWidget = React.lazy(() => import("de_common_ui/ProjectWidget"));

interface WidgetProps {
  navigateTo?(): void;
  navigateToLabel?: string;
}

const Widget: React.FC<WidgetProps> = ({
  navigateTo,
  navigateToLabel = "View",
}: WidgetProps): JSX.Element => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
      <ProjectWidget
        title="Boilerplate example widget"
        navigateTo={navigateTo}
        navigateToLabel={navigateToLabel}
      >
        <Flex p="4" justify="center" justifyContent="center">
          The Origin Integration Boilerplate is a developers seed project that
          contains the necassary configuration to connect the Origin Graph as an
          authorised user.
        </Flex>
      </ProjectWidget>
    </ErrorBoundary>
  );
};

export default Widget;
