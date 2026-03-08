// src/components/admin/UserDetailsModal.jsx
import React from 'react';
import { 
  FiX, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiFilm,
  FiLock,
  FiUnlock,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';

const UserDetailsModal = ({ user, onClose, onBlock, onRoleChange }) => {
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-green-100', text: 'text-green-800', icon: FiUserCheck, label: 'Active' },
      inactive: { bg: 'bg-gray-100', text: 'text-gray-800', icon: FiUserX, label: 'Inactive' },
      blocked: { bg: 'bg-red-100', text: 'text-red-800', icon: FiLock, label: 'Blocked' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    const Icon = config.icon;
    
    return (
      <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit`}>
        <Icon size={16} />
        {config.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">User Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Header with Avatar */}
          <div className="flex items-start gap-6 pb-6 border-b">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-purple-100"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                  <p className="text-gray-500 mt-1">{user.email}</p>
                </div>
                <StatusBadge status={user.status} />
              </div>
              
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => onBlock(user)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    user.status === 'blocked'
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {user.status === 'blocked' ? <FiUnlock size={16} /> : <FiLock size={16} />}
                  {user.status === 'blocked' ? 'Unblock User' : 'Block User'}
                </button>
                
                <select
                  value={user.role}
                  onChange={(e) => onRoleChange(user, e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-2 gap-6 py-6 border-b">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiMail className="text-gray-400" size={18} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiPhone className="text-gray-400" size={18} />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiMapPin className="text-gray-400" size={18} />
                  <span>{user.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-3">Account Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-700">
                  <FiCalendar className="text-gray-400" size={18} />
                  <span>Joined: {user.joinDate}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiClock className="text-gray-400" size={18} />
                  <span>Last Active: {user.lastActive}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FiUserCheck className="text-gray-400" size={18} />
                  <span>Role: <span className="capitalize">{user.role}</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 py-6 border-b">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">{user.totalBookings}</p>
              <p className="text-sm text-gray-600 mt-1">Total Bookings</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{user.totalSpent}</p>
              <p className="text-sm text-gray-600 mt-1">Total Spent</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.floor(user.totalBookings / 2)}
              </p>
              <p className="text-sm text-gray-600 mt-1">Movies Watched</p>
            </div>
          </div>

          {/* Preferences */}
          <div className="py-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Preferences</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Language</p>
                <p className="font-medium text-gray-800 mt-1">{user.preferences.language}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Notifications</p>
                <p className={`font-medium mt-1 ${user.preferences.notifications ? 'text-green-600' : 'text-red-600'}`}>
                  {user.preferences.notifications ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Newsletter</p>
                <p className={`font-medium mt-1 ${user.preferences.newsletter ? 'text-green-600' : 'text-gray-600'}`}>
                  {user.preferences.newsletter ? 'Subscribed' : 'Not Subscribed'}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Account Age</p>
                <p className="font-medium text-gray-800 mt-1">
                  {Math.floor((new Date() - new Date(user.joinDate)) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity (Sample) */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Booked "Inception" - 2 hours ago</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Watched "The Dark Knight" - Yesterday</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Added review for "Interstellar" - 3 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;