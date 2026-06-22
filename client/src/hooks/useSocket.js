import userAuthStore from "@/store/authStore"
import { io } from 'socket.io-client';
import { useEffect, useRef } from 'react'

function useSocket(){
    const accessToken = userAuthStore((state) => state.accessToken);
    const isAuthenticated = userAuthStore((state) => state.isAuthenticated);

    const socketRef = useRef(null);

    useEffect(() => {
        if(!accessToken || !isAuthenticated){
            return;
        }

        socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
            auth: {
                token: accessToken
            }
        })

        socketRef.current.on("connect", () => {
            console.log(
                "Socket connected:",
                socketRef.current.id
            );
        });

        socketRef.current.on(
            "disconnect",
            (reason) => {
                console.log(
                    "Socket disconnected:",
                    reason
                );
            }
        );

        return () => {
            socketRef.current?.disconnect();
        }
    }, [accessToken, isAuthenticated])
}

export default useSocket