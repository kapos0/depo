import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

type AppContextValue = {
  favorites: string[];
  menu: Record<string, string[]>;
  toggleFavorite: (id: string) => void;
  addToMenu: (id: string, meal: string) => void;
  removeFromMenu: (id: string, meal: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState(["adana-kebap", "pancake"]);
  const [menu, setMenu] = useState<Record<string, string[]>>({ Kahvaltı: ["menemen"], Öğle: [], Akşam: ["adana-kebap"] });
  const value = useMemo(() => ({
    favorites,
    menu,
    toggleFavorite: (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    addToMenu: (id: string, meal: string) => setMenu((current) => ({ ...current, [meal]: [...new Set([...(current[meal] || []), id])] })),
    removeFromMenu: (id: string, meal: string) => setMenu((current) => ({ ...current, [meal]: (current[meal] || []).filter((item) => item !== id) })),
  }), [favorites, menu]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const value = useContext(AppContext);
  if (!value) throw new Error("useAppStore must be used inside AppProvider");
  return value;
}
