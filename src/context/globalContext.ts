import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "../requests/user";

export interface GlobalValue {
    currentUser?: User;
    token?: string;
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
    setToken: Dispatch<SetStateAction<string | undefined>>;
    currentUserLoading: boolean;
}

export const globalContext = createContext<GlobalValue | undefined>(undefined);
