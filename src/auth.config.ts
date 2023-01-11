export const OriginServicesScopes: string[] = process.env.ORIGIN_SCOPES
  ? process.env.ORIGIN_SCOPES?.split(",").map(
      (scope: string) =>
        `api://${process.env.REACT_APP_API_APP_ID}/${scope.toLowerCase()}`
    )
  : [];

export const OriginServicesRequest: any = {
  scopes: OriginServicesScopes,
};
