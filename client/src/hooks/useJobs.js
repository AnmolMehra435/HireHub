import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const fetchJobs = async () => {
    const response = await api.get('/jobs')
    return response.data
}

const useJobs = () => {
    return useQuery({
        queryKey: ['jobs'],
        queryFn: fetchJobs,
    })
}

export default useJobs