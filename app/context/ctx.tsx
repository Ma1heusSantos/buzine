import React from "react";
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
