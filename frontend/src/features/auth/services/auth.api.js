import api from "../../../lib/api/axios"

export const RegisterUser = async (data) => {
    const res = await api.post('/auth/register', data)
    return res.data
}

export const LoginUser = async (data) => {
    const res = await api.post('/auth/login', data)
    return res.data
}

export const ProfileUser = async () => {
    const res = await api.get('/auth/profile')
    return res.data
}

export const GetMe = async () => {
    const res = await api.get('/auth/getme')
    return res.data
}
export const LogOutUser = async () => {
    const res = await api.get('/auth/logout')
    return res.data
}