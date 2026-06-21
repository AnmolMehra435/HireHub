import axios from 'axios'
import userAuthStore from '@/store/authStore'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
})

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(({resolve, reject}) => {
        if(error){
            reject(error);
        }else{
            resolve(token);
        }
    });

    failedQueue = [];
}

api.interceptors.request.use(
    (config) => {
        const token = userAuthStore.getState().accessToken;
        
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        
        return config;
    }, (error) => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
        return response;
    },

    async (error) => {
        const originalRequest = error.config;

        if(error.response?.status === 401 && !originalRequest._retry){

            if(isRefreshing){
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                    });
                }).then(() => {
                    return api(originalRequest)
                })
            }

            originalRequest._retry = true;
            isRefreshing = true;
            try{
                const refreshResponse = await axios.post(
                    `${import.meta.env.VITE_API_URL}/auth/refresh`,
                    {},
                    {
                        withCredentials: true,
                    }
                )

                const newToken = refreshResponse.data.data.accessToken;

                if(newToken){
                    userAuthStore.getState().setAccessToken(newToken);
                }

                processQueue(null, newToken)

                return api(originalRequest)
            }catch(refreshError){
                processQueue(refreshError)
                userAuthStore.getState().logout();

                return Promise.reject(refreshError)
            }finally{
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
)

export default api