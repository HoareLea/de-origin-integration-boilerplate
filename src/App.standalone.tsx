import React, { Suspense, memo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { lazily } from "react-lazily";

import {
  ErrorFallback,
  errorHandler,
} from "@components/ErrorFallback/ErrorFallback.component";

import StandaloneView from "./views/standalone/standalone.view";

const ThemeProvider = React.lazy(() => import("de_common_ui/ThemeProvider"));
const Orial = lazily(() => import("de_origin/Orial"));

const AppContainer: React.FC<any> = (): JSX.Element => {
  return (
    <Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
        <ThemeProvider>
          <Orial.AuthProvider>
            <Orial.ClientProvider>
              <StandaloneView />
            </Orial.ClientProvider>
          </Orial.AuthProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </Suspense>
  );
};

export default memo(AppContainer);
