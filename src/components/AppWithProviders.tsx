import React from "react";

type AppWithProvidersProps = {
  children: React.ReactNode;
};

export default function AppWithProviders({ children }: AppWithProvidersProps) {
  return <>{children}</>;
}
