import React from "react";
import { useStorageState } from "../../components/useStorageState";

const AuthContext = React.createContext<{
  signIn: (email: string) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: async () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}
// export function SessionProvider(props: React.PropsWithChildren) {
//   const [[isLoading, session], setSession] = useStorageState("session");

//   async function signIn(email: string, password: string) {
//     try {
//       // Chamar a API para autenticar
//       const response = await fetch("https://sua-api.com/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const result = await response.json();

//       if (response.ok && result.token) {
//         setSession(result.token); // Armazena o token
//       } else {
//         throw new Error(result.message || "Erro ao fazer login");
//       }
//     } catch (error) {
//       console.error("Erro no login:", error);
//     }
//   }
// }

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string) => {
          // adicionar logica de validação
          setSession(email); //adicionar o usuario ao qual eu quero logar
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
