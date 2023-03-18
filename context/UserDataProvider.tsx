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

type StateType = {
    uid: string;
    name: string;
    email: string;
    role: Record<string, boolean>;
};

function useUserDataContext() {
    const [userData, setUserData] = useState<StateType | null>(null);
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false);
    const [user] = useAuthState(auth);
    useEffect(() => {
        if (!user) {
            setUserData(null);
            return;
        }
        async function getUserData() {
            setUserDataLoading(true);
            const userRef = ref(db, `users/${user?.uid}`);
            const snapshot = await get(userRef);
            if (!snapshot.exists()) {
                await set(userRef, {
                    uid: user?.uid,
                    name: user?.displayName,
                    email: user?.email,
                    role: {
                        subscriber: true,
                    },
                });
            }
            setUserData(snapshot.val());
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

type ChildrenType = { children: ReactElement };

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
