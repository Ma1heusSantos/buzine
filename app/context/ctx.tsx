import React from "react";
import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "../../components/useStorageState";
import { User } from "../../types/user";

const AuthContext = React.createContext<{
  signIn: (user: User) => void;
  signOut: () => void;
  session?: User | null;
  isLoading: boolean;
}>({
  signIn: async () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (user: User) => {
          if (!user || !user.token) {
            console.log("usuario não encontrado");
            return;
          }
          console.log(user);
          setSession(user); //adicionar o usuario ao qual eu quero logar
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
