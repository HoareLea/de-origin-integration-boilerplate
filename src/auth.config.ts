// Config object to be passed to Msal on creation
// export const config: AuthConfiguration = {
export const config: any = {
  auth: {
    clientId: process.env.REACT_APP_AZURE_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_AZURE_TENANT_ID}`,
    redirectUri: `${process.env.AUTH_LOGIN_URL}`,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const OriginServicesScopes: string[] = process.env.ORIGIN_SCOPES
  ? process.env.ORIGIN_SCOPES?.split(",").map(
      (scope: string) =>
        `api://${process.env.REACT_APP_AZURE_CLIENT_ID}/${scope.toLowerCase()}`
    )
  : [];
