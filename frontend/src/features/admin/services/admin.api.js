
import api from '../../../lib/api/axios'



export const createMovie = async (data) => {
    const res = await api.post('/movie', data)
    return res.data
}

export const getAllMovies = async () => {
    const res = await api.get('/movie/all')
    return res.data
}

export const getRandomMovies = async () => {
    const res = await api.get('/movie/movies/random')
    return res.data
}

export const getMovieById = async (id) => {
    const res = await api.get(`/movie/${id}`)
    return res.data
}

export const getMovieUpdate = async (id, data) => {
    const res = await api.put(`/movie/${id}`, data)
    return res.data
}

export const MovieDelete = async (id) => {
    const res = await api.delete(`/movie/${id}`)
    return res.data
}