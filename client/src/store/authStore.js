import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const userAuthStore = create(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            accessToken: null,

            setUser: (userData) => 
                set({
                    user: userData,
                    isAuthenticated: true,
                }),
            

            logout: () => 
                set({
                    user: null,
                    isAuthenticated: false,
                    accessToken: null,
                }),

            setAccessToken: (token) => {
                set({
                    accessToken: token,
                })
            }
            
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default userAuthStore