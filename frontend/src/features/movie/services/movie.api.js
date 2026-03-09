import api from "../../../lib/api/axios"

export const getMovieById = async (id) => {
    const res = await api.get(`/movie/${id}`)
    return res.data
}


export const MovieAddHistory = async (id) => {
    const res = await api.post(`/history/${id}`)
    return res.data
}

export const MovieGetHistory = async () => {
    const res = await api.post(`/history`)
    return res.data
}
