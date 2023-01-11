import { gql, useQuery } from "@apollo/client";

import { Project } from "aecTypes";

function useQueryProject(project_code: string) {
  const query = gql`
    query GetProject($project_code: String!) {
      projects(where: { Project_Code: $project_code }) {
        Project_Code
        Id
      }
    }
  `;
  const {
    data: hiveData,
    loading,
    error,
  } = useQuery(query, {
    variables: { project_code },
  });
  const data: Project = hiveData?.projects[0];
  return { data, loading, error };
}

export default useQueryProject;
