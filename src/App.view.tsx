import React, { useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { OriginServicesRequest } from "./auth.config";
import ThemeProvider from "./ThemeProvider";
import PageView from "./views/page/page.view";

// const ThemeProvider = React.lazy(() => import("de_common_ui/ThemeProvider"));
const ApolloAuthRemoteProvider = React.lazy(
  () => import("de_origin/ApolloAuthRemoteProvider")
);
export interface AppProps {
  mode?: "light" | "dark" | "system";
  authContext?: any;
  isAdmin?: boolean;
  projectId?: any;
  project?: any;
}

function ErrorFallback({ error, resetErrorBoundary }: any) {
  console.log(error);
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

const AppView: React.FC<AppProps> = ({
  authContext,
  ...restProps
}: AppProps): JSX.Element => {
  const [theme, setTheme] = useState<any>();
  const [error, setError] = useState<any>(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const styles: any = await import("de_common_ui/styles");
      const data: any = await import("de_common_ui/Theme");
      setTheme(data.default);
    };
    fetchTheme().catch(() => setError(true));
  }, []);

  if (error) return <>Cannot load theme APP VIEW</>;
  if (!theme) return <>Loading new app</>;
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
        <ApolloAuthRemoteProvider
          authContext={authContext}
          servicesRequest={OriginServicesRequest}
        >
          <PageView {...restProps} />
        </ApolloAuthRemoteProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default AppView;
