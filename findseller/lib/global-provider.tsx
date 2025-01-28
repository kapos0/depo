import React, { createContext, useContext, ReactNode } from "react";

import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

type GlobalContextType = {
    isLogged: boolean;
    user: User | null;
    loading: boolean;
    refetch: (newParams: Record<string, string | number>) => Promise<void>;
};

type User = {
    $id: string;
    name: string;
    email: string;
    avatar: string;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

type GlobalProviderProps = {
    children: ReactNode;
};

export function GlobalProvider({ children }: GlobalProviderProps) {
    const {
        data: user,
        loading,
        refetch,
    } = useAppwrite({
        fn: getCurrentUser,
    });

    const isLogged = !!user;

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                user,
                loading,
                refetch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext(): GlobalContextType {
    const context = useContext(GlobalContext);
    if (!context)
        throw new Error(
            "useGlobalContext must be used within a GlobalProvider"
        );

    return context;
}
