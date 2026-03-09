import React from 'react'
import { FiCheckCircle, FiEdit2, FiEye, FiLock, FiTrash2, FiUnlock, FiUserX } from 'react-icons/fi';

const UserCard = ({ user, setSelectedUser, setShowDetailsModal, handleBlockUser, setShowDeleteModal }) => {

    return (
        <tr key={user.id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4">
                {user.isBlock ? "BLOCKED": "ACTIVE"}
            </td>
            <td className="px-6 py-4 text-sm text-gray-600">{user?.joinDate}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            setSelectedUser(user);
                            setShowDetailsModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="View Details"
                    >
                        <FiEye size={18} className="text-gray-600" />
                    </button>

                    <button
                        onClick={() => handleBlockUser(user._id)}
                        className="p-1 hover:bg-gray-100 rounded"
                        title={user.status === 'blocked' ? 'Unblock User' : 'Block User'}
                    >
                        {user.status === 'blocked' ? (
                            <FiUnlock size={18} className="text-green-600" />
                        ) : (
                            <FiLock size={18} className="text-orange-600" />
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Delete User"
                    >
                        <FiTrash2 size={18} className="text-red-600" />
                    </button>
                </div>
            </td>
        </tr>
    )
}

export default UserCard