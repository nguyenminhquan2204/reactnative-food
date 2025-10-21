import { createContext, useContext, useState } from "react";

interface AppContextType {
   theme: string;
   setTheme: (v: string) => void;
   appState: IUserLogin | null;
   setAppState: (v: any) => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface IProps {
   children: React.ReactNode
}

export const useCurrentApp = () => {
   const currentTheme = useContext(AppContext);

   if (!currentTheme) {
      throw new Error(
         'useCurrentApp has to be used within ...'
      )
   }

   return currentTheme;
}

export const AppProvider = (props: IProps) => {
   const [theme, setTheme] = useState<string>("abc");
   const [appState, setAppState] = useState<IUserLogin | null>(null);

   return (
      <AppContext.Provider value={{ theme, setTheme, appState, setAppState }}>
         {props.children}
      </AppContext.Provider>
   )
}