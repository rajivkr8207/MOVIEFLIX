// src/components/admin/UserManagement.jsx
import React, { useState } from 'react';
import { 
  FiUsers, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiEye,
  FiFilter,
  FiX,
  FiCheckCircle,
  FiLock,
  FiUnlock,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';
import EditUserModal from './EditUserModal';
import UserDetailsModal from './UserDetailsModal';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterRole, setFilterRole] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  // const [viewMode, setViewMode] = useState('grid'); // grid or table

  // Sample users data
  const [users, setUsers] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      email: "john.doe@example.com",
      phone: "+1 234 567 890",
      location: "New York, USA",
      role: "admin",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=1",
      joinDate: "2024-01-15",
      lastActive: "2024-03-20 14:30",
      totalBookings: 45,
      totalSpent: "$2,345",
      preferences: {
        language: "English",
        notifications: true,
        newsletter: true
      }
    },
    { 
      id: 2, 
      name: "Sarah Smith", 
      email: "sarah.smith@example.com",
      phone: "+1 345 678 901",
      location: "Los Angeles, USA",
      role: "user",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=2",
      joinDate: "2024-02-10",
      lastActive: "2024-03-19 09:15",
      totalBookings: 23,
      totalSpent: "$1,234",
      preferences: {
        language: "English",
        notifications: true,
        newsletter: false
      }
    },
    { 
      id: 3, 
      name: "Mike Johnson", 
      email: "mike.johnson@example.com",
      phone: "+1 456 789 012",
      location: "Chicago, USA",
      role: "user",
      status: "blocked",
      avatar: "https://i.pravatar.cc/150?img=3",
      joinDate: "2024-01-05",
      lastActive: "2024-03-15 11:20",
      totalBookings: 12,
      totalSpent: "$567",
      preferences: {
        language: "English",
        notifications: false,
        newsletter: false
      }
    },
    { 
      id: 4, 
      name: "Emily Brown", 
      email: "emily.brown@example.com",
      phone: "+1 567 890 123",
      location: "Houston, USA",
      role: "moderator",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=4",
      joinDate: "2024-03-01",
      lastActive: "2024-03-20 10:45",
      totalBookings: 8,
      totalSpent: "$345",
      preferences: {
        language: "English",
        notifications: true,
        newsletter: true
      }
    },
    { 
      id: 5, 
      name: "David Wilson", 
      email: "david.wilson@example.com",
      phone: "+1 678 901 234",
      location: "Phoenix, USA",
      role: "user",
      status: "inactive",
      avatar: "https://i.pravatar.cc/150?img=5",
      joinDate: "2024-02-20",
      lastActive: "2024-03-10 16:30",
      totalBookings: 3,
      totalSpent: "$89",
      preferences: {
        language: "English",
        notifications: true,
        newsletter: false
      }
    },
    { 
      id: 6, 
      name: "Lisa Anderson", 
      email: "lisa.anderson@example.com",
      phone: "+1 789 012 345",
      location: "Philadelphia, USA",
      role: "user",
      status: "active",
      avatar: "https://i.pravatar.cc/150?img=6",
      joinDate: "2024-03-05",
      lastActive: "2024-03-19 13:15",
      totalBookings: 15,
      totalSpent: "$678",
      preferences: {
        language: "English",
        notifications: true,
        newsletter: true
      }
    }
  ]);

  // Filter users based on search, status, and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    
    return matchesSearch && matchesStatus && matchesRole;
  });
 

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  const handleBlockUser = (user) => {
    setUsers(users.map(u => 
      u.id === user.id 
        ? { ...u, status: u.status === 'blocked' ? 'active' : 'blocked' }
        : u
    ));
  };

  const handleRoleChange = (user, newRole) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, role: newRole } : u
    ));
  };

  // Statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const blockedUsers = users.filter(u => u.status === 'blocked').length;
  const adminUsers = users.filter(u => u.role === 'admin').length;

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: FiCheckCircle, label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: FiUserX, label: 'Inactive' },
      blocked: { bg: 'bg-red-100', text: 'text-red-800', icon: FiLock, label: 'Blocked' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    
    return (
      <span className={`${config.bg} ${config.text} px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit`}>
        <Icon size={12} />
        {config.label}
      </span>
    );
  };

  // Role badge component
  const RoleBadge = ({ role }) => {
    const roleConfig = {
      admin: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Admin' },
      moderator: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Moderator' },
      user: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'User' }
    };
    
    const config = roleConfig[role] || roleConfig.user;
    
    return (
      <span className={`${config.bg} ${config.text} px-2 py-1 text-xs rounded-full`}>
        {config.label}
      </span>
    );
  };

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
          <p className="text-gray-500 text-sm mt-2">{((activeUsers/totalUsers)*100).toFixed(1)}% of total</p>
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
          <p className="text-gray-500 text-sm mt-2">{((blockedUsers/totalUsers)*100).toFixed(1)}% of total</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Admins</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{adminUsers}</h3>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FiUsers className="text-blue-600" size={24} />
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2">Platform administrators</p>
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

            <div className="flex items-center gap-2 border-l pl-4">
              <FiFilter className="text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border-none bg-transparent focus:outline-none text-gray-600"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{user.phone}</div>
                    <div className="text-sm text-gray-500">{user.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
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
                        onClick={() => {
                          setSelectedUser(user);
                          setShowEditModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                        title="Edit User"
                      >
                        <FiEdit2 size={18} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleBlockUser(user)}
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
              ))}
            </tbody>
          </table>
        </div>


      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onEdit={handleEditUser}
        />
      )}

      {showDetailsModal && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedUser(null);
          }}
          onBlock={handleBlockUser}
          onRoleChange={handleRoleChange}
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