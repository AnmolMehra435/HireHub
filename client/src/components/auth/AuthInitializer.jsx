import { useEffect } from "react";
import userAuthStore from "../../store/authStore.js";

function AuthInitializer({ children }) {

    const refresh = userAuthStore(
        (state) => state.refresh
    );

    useEffect(() => {

        const initializeAuth = async () => {
            try {
                await refresh();
            } catch (error) {
                console.log("No active session");
                console.log(error)
            }
        };

        initializeAuth();

    }, [refresh]);

    return children;
}

export default AuthInitializer;