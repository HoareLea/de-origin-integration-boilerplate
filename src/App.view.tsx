import React, { useContext } from "react";

import { AuthRemoteContext } from "de_origin/AuthRemote";

import PageContainer from "./views/page/page.container";

export interface AppProps {
  projectId?: any;
}

const AppView: React.FC<AppProps> = ({ projectId }: AppProps): JSX.Element => {
  const {
    useAuth: { isAuthenticated },
  } = useContext<any>(AuthRemoteContext);
  // const { isAuthenticated } = useAuth();
  console.log("isAuthenticated: ", isAuthenticated);
  // @TODO: create reactive vars for shell global data
  // OR..
  // @TODO: create provider for shell global data?
  return <PageContainer projectId={projectId} />;
};

export default AppView;
