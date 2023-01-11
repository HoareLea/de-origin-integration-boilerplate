import { BoxProps as ChakraBoxProps } from "@chakra-ui/react";

export interface AppProps extends ChakraBoxProps {
  mode?: "light" | "dark" | "system";
  authContext?: any;
  isAdmin?: boolean;
  projectId?: any;
  project?: any;
}
