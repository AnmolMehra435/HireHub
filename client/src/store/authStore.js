import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '@lib/api'

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
                    isAuthenticated: !!token
                })
            },

            login: async (credentials) => {
                try{
                    const response = await api.post(
                        'auth/login',
                        credentials
                    )

                    set({
                        user: response.data.data.userData,
                        accessToken: response.data.data.accessToken,
                        isAuthenticated: true
                    })

                    return response.data
                }catch(error){
                    console.log(error.response?.data || error);
                    throw error
                }
            },

            register: async (credentials) => {
                try{
                    const response = await api.post(
                        'auth/register',
                        credentials
                    )

                    set(
                        {
                            user: response.data.data.user,
                            accessToken: response.data.data.accessToken,
                            isAuthenticated: true
                        }
                    )

                    return response.data
                }catch(error){
                    console.log(error.response?.data || error);
                    throw error
                }
            }
            
        }),
        {
            name: 'auth-storage',
        }
    )
)

export default userAuthStore