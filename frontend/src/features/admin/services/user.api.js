import api from "../../../lib/api/axios"


export const blockUser = async (id) => {
    const res = await api.patch(`/admin/block/${id}`)
    return res.data
}

export const unblockUser = async (id) => {
    const res = await api.patch(`/admin/unblock/${id}`)
    return res.data
}

export const DeletUser = async (id) => {
    const res = await api.delete(`/admin/users/${id}`)
    return res.data
}