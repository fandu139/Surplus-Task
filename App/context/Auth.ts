import React from 'react';

interface Context {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  accountData: Record<string, never>;
  setAccountData: React.Dispatch<React.SetStateAction<{}>>;
}

export const initialAuthContext: Context = {
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  accountData: {},
  setAccountData: () => null,
};

const AuthContext = React.createContext<Context>(initialAuthContext);
export default AuthContext;
