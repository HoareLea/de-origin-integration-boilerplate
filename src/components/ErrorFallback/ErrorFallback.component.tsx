import React from "react";

export function ErrorFallback({ error }: any) {
  return (
    <div role="alert">
      <strong>Something went wrong:</strong>
      <pre>{error?.message}</pre>
    </div>
  );
}

export const errorHandler = (
  error: Error,
  info: { componentStack: string }
) => {
  console.warn(error, info);
};
