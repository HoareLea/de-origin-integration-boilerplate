import React from "react";

import { ChakraProvider, ColorModeScript, CSSReset } from "@chakra-ui/react";

interface ThemeProviderProps {
  children: JSX.Element | JSX.Element[] | string;
  theme: any | undefined;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme,
}: ThemeProviderProps): JSX.Element => {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <CSSReset />
        {children}
      </ChakraProvider>
    </>
  );
};

export default ThemeProvider;
