import { createContext, Dispatch, SetStateAction } from "react";
import { IUser } from "../../server/src/models/User";

export interface GlobalValue {
    currentUser?: IUser;
    token?: string;
    setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>;
    setToken: Dispatch<SetStateAction<string | undefined>>;
    currentUserLoading: boolean;
}

export const globalContext = createContext<GlobalValue | undefined>(undefined);
