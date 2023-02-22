import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { lazily } from "react-lazily";

import {
  ErrorFallback,
  errorHandler,
} from "@components/ErrorFallback/ErrorFallback.component";

import AppView from "./App.view";
import { config, OriginServicesScopes } from "./auth.config";

const ThemeProvider = React.lazy(() => import("de_common_ui/ThemeProvider"));
const { AuthRemote } = lazily(() => import("de_origin/AuthRemote"));

// @TODO: get the projectId from the route params specifically for the standlone version
const PROJECT_ID = "15S0011";

const AppContainer: React.FC<any> = (): JSX.Element => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
      <ThemeProvider>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
          <AuthRemote
            title="Origin Boilerplate"
            appVersion={MyAppVersion}
            config={config}
            tenantId={process.env.REACT_APP_AZURE_TENANT_ID}
            servicesScopes={OriginServicesScopes}
            dataGraphURI={process.env.REACT_APP_BUILDING_DATA_API}
          >
            <AppView projectId={PROJECT_ID} />
          </AuthRemote>
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppContainer;
