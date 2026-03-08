import { useState } from 'react'
import { blockUser, unblockUser, DeletUser } from '../services/user.api.js'
import { toast } from 'react-toastify'

const UseUser = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleBlock = async (id) => {
        try {
            setLoading(true)
            setError(null)
            const res = await blockUser(id)
            toast.success(res.message)
        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    const handleUnlock = async (id) => {
        try {
            setLoading(true)
            setError(null)
            const res = await unblockUser(id)
            toast.success(res.message)

        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true)
            setError(null)
            const res = await DeletUser(id)
            toast.success(res.message)

        } catch (err) {
            setError(err.message)
            return { success: false, error: err.message }
        } finally {
            setLoading(false)
        }
    }

    return {
        handleBlock,
        handleUnlock,
        handleDelete,
        loading,
        error
    }
}

export default UseUser