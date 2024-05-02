import React from "react";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
type Props = {
  children: React.ReactNode;
};

export const Auth0ProviderWithNAvigate = ({ children }: Props) => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_REDIRECT_URI;

  if (!domain || !clientId || !redirectUri) {
    throw new Error("Missing required environment variables");
  }
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    console.log("user:", user);
    console.log("appState:", appState);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirectUri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
