import { createContext, Dispatch, SetStateAction } from "react";
import { IUser } from "../../server/src/models/User";

interface GlobalValue {
    currentUser?: IUser;
    setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>;
}

export const globalContext = createContext<GlobalValue | undefined>(undefined);
