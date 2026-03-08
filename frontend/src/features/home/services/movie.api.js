import api from "../../../lib/api/axios"

export const getMovieById = async (id) => {
    const res = await api.get(`/movie/${id}`)
    return res.data
}