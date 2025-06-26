"use client";
import {
  createContext,
  useState,
  ReactNode,
  useLayoutEffect,
} from "react";

interface MainContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const MainContext = createContext<MainContextType>({
  isLoading: true,
  setIsLoading: () => { },
});

export default function MainContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useLayoutEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <MainContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
