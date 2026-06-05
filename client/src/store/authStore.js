import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,

            setUser: (userData) => 
                set({
                    user: userData,
                    isAuthenticated: true,
                }),
            

            logout: () => 
                set({
                    user: null,
                    isAuthenticated: false,
                }),
            
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default userAuthStore