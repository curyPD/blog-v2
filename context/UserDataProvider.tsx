import {
    createContext,
    useState,
    useEffect,
    ReactElement,
    useContext,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase/firebase";
import { get, ref, set } from "firebase/database";
import { UserDataType, ChildrenType } from "../types";
import { User } from "firebase/auth";

function useUserDataContext() {
    const [userData, setUserData] = useState<UserDataType | null>(null);
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            setUserData(null);
            return;
        }

        async function getUserData() {
            setUserDataLoading(true);
            const userRef = ref(db, `users/${(user as User).uid}`);
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                await set(userRef, {
                    uid: (user as User).uid,
                    name: (user as User).displayName,
                    email: (user as User).email,
                    role: {
                        subscriber: true,
                    },
                });
                const newSnapshot = await get(userRef);
                const value: UserDataType = newSnapshot.val();
                setUserData(value);
            } else {
                setUserData(snapshot.val());
            }
            setUserDataLoading(false);
        }
        getUserData();
    }, [user]);

    return { userData, userDataLoading };
}

type UseUserDataContextType = ReturnType<typeof useUserDataContext>;

const initContextState: UseUserDataContextType = {
    userData: null,
    userDataLoading: false,
};

export const UserDataContext =
    createContext<UseUserDataContextType>(initContextState);

export default function AuthProvider({ children }: ChildrenType): ReactElement {
    return (
        <UserDataContext.Provider value={useUserDataContext()}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserData() {
    return useContext(UserDataContext);
}
