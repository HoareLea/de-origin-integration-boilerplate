import React from "react";

import { useOrialAuth } from "de_origin/Orial";

import PageContainer from "../page/page.container";

const StandaloneView: React.FC = (): JSX.Element => {
  const { useAuth } = useOrialAuth();
  const { isAuthenticated } = useAuth();
  console.log("isAuthenticated: ", isAuthenticated);
  return <PageContainer projectId="SAMPLE" />;
};

export default StandaloneView;
