"use client";

import { createContext, FC, PropsWithChildren, useContext } from "react";
import { Session } from "next-auth";

interface AuthContextType {
  user: Session["user"];
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuthContext() {
  return useContext(AuthContext) as AuthContextType;
}

interface AuthContextProviderProps extends PropsWithChildren {
  user: Session["user"];
}

export const AuthContextProvider: FC<AuthContextProviderProps> = ({
  children,
  user,
}) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
