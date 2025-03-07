import { createContext } from "react";
import { User } from "firebase/auth";

type UserContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});
