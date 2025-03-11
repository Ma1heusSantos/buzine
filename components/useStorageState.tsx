import { useEffect, useCallback, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { User } from "../types/user";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (Platform.OS === "web") {
    try {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.error("Local storage is unavailable:", e);
    }
  } else {
    if (value == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  }
}

// Modifiquei a função para aceitar User ou null
export function useStorageState(key: string): UseStateHook<User | null> {
  const [state, setState] = useAsyncState<User | null>([true, null]);

  // Função para recuperar o valor armazenado (com JSON.parse)
  useEffect(() => {
    if (Platform.OS === "web") {
      try {
        const storedValue = localStorage.getItem(key);
        setState(storedValue ? JSON.parse(storedValue) : null); // Converte a string para objeto
      } catch (e) {
        console.error("Local storage is unavailable:", e);
      }
    } else {
      SecureStore.getItemAsync(key).then((value) => {
        setState(value ? JSON.parse(value) : null); // Converte de string para objeto
      });
    }
  }, [key]);

  // Função para armazenar o valor (com JSON.stringify)
  const setValue = useCallback(
    (value: User | null) => {
      setState(value);
      setStorageItemAsync(key, value ? JSON.stringify(value) : null); // Converte objeto para string
    },
    [key]
  );

  return [state, setValue];
}
