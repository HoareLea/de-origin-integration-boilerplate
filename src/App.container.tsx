import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import AppView from "./App.view";

// @TODO: enable indepenedent SSO..
/* import { config as authConfig } from "./auth.config";
const { setAuthTenantID, useAuth } = React.lazy(() => import("de_common_ui/AuthSSO/AuthSSO.service"));
setAuthTenantID(process.env.REACT_APP_AZURE_TENANT_ID); */

const ThemeProvider = React.lazy(() => import("de_common_ui/ThemeProvider"));

function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
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

const AppContainer: React.FC<any> = (): JSX.Element => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      <ThemeProvider>
        <AppView authContext={null} />
        {/* <AppView authContext={authConfig} /> */}
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppContainer;
