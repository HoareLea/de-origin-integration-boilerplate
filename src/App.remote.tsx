import React from "react";

import PageContainer from "./views/page/page.container";

export interface AppProps {
  projectId?: any;
}

const AppRemote: React.FC<AppProps> = ({
  projectId,
}: AppProps): JSX.Element => {
  return <PageContainer projectId={projectId} />;
};

export default AppRemote;
