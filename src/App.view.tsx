import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Project } from "types/aecTypes";

import { OriginServicesRequest } from "./auth.config";
import PageView from "./views/page/page.view";

const ApolloAuthRemoteProvider = React.lazy(
  () => import("de_origin/ApolloAuthRemoteProvider")
);
export interface AppProps {
  authContext?: any;
  isAdmin?: boolean;
  projectId?: any;
  project?: Project | null;
}

function ErrorFallback({ error, resetErrorBoundary }: any) {
  console.log(error);
  return (
    <div role="alert">
      <p>Something went wrong in this boilerplate:</p>
      <pre>{error?.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  console.info(error, info);
};

const AppView: React.FC<AppProps> = ({
  authContext,
  projectId,
  isAdmin,
  project = null,
}: AppProps): JSX.Element => {
  console.log("isAdmin: ", isAdmin);
  console.log("project: ", project);
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <ApolloAuthRemoteProvider
        authContext={authContext}
        servicesRequest={OriginServicesRequest}
      >
        <PageView projectId={projectId} />
      </ApolloAuthRemoteProvider>
    </ErrorBoundary>
  );
};

export default AppView;
