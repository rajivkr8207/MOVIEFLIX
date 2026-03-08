// src/components/admin/UserManagement.jsx
import React, { useEffect, useState } from 'react';
import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiX,
  FiLock,
  FiUserCheck,
} from 'react-icons/fi';
import UserDetailsModal from './UserDetailsModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import UserCard from './UserCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../stores/slices/userSlice';
import UseUser from '../../hooks/UseUser';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const { handleBlock, handleDelete, handleUnlock } = UseUser()

  // Filter users based on search, status, and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())


    return matchesSearch
  });


  const handleDeleteUser = (id) => {
    handleDelete(id)
    dispatch(fetchUsers());

  };

  const handleBlockUser = (id) => {
    if (selectedUser.isBlock) {
      handleUnlock(id)
    } else {
      handleBlock(id)
    }
    dispatch(fetchUsers());
  };


  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isBlock === false).length;
  const blockedUsers = users.filter(u => u.isBlock === true).length;




  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600 mt-1">Manage your platform users</p>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalUsers}</h3>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FiUsers className="text-purple-600" size={24} />
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2">↑ 15% from last month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Users</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{activeUsers}</h3>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FiUserCheck className="text-green-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">{((activeUsers / totalUsers) * 100).toFixed(1)}% of total</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Blocked Users</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{blockedUsers}</h3>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <FiLock className="text-red-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">{((blockedUsers / totalUsers) * 100).toFixed(1)}% of total</p>
        </div>

      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name, email, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>

          </div>

        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <UserCard user={user} setSelectedUser={setSelectedUser} setShowDetailsModal={setShowDetailsModal} handleBlockUser={handleBlockUser} setShowDeleteModal={setShowDeleteModal} />
            ))}
          </tbody>
        </table>
      </div>



      {showDetailsModal && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedUser(null);
          }}
          onBlock={handleBlockUser}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteConfirmationModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UserManagement;