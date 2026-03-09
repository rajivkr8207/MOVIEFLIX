import { FiX, FiMail, FiCalendar, FiLock, FiUnlock } from "react-icons/fi";

const UserDetailsModal = ({ user, onClose, onBlock }) => {
  const StatusBadge = ({ isBlocked }) => {

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm ${isBlocked
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
          }`}
      >
        {isBlocked ? "Blocked" : "Active"}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl w-full max-w-xl">

        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">

          <h2 className="text-lg font-semibold">
            User Details
          </h2>

          <button onClick={onClose}>
            <FiX size={20} />
          </button>

        </div>

        <div className="p-6">

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">

            <div>

              <h3 className="text-lg font-semibold">
                {user?.name}
              </h3>

              <p className="text-sm text-gray-500">
                {user?.email}
              </p>

            </div>

            <div className="ml-auto">
              <StatusBadge isBlocked={user?.isBlock} />
            </div>

          </div>

          {/* Basic Info */}
          <div className="space-y-3 text-sm text-gray-700">

            <div className="flex items-center gap-2">
              <FiMail size={16} />
              {user?.email}
            </div>

            <div className="flex items-center gap-2">
              <FiCalendar size={16} />
              Joined: {new Date(user?.createdAt).toDateString()}
            </div>

            <div>
              Role: <span className="capitalize">{user?.role}</span>
            </div>

          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">

            <button
              onClick={() => onBlock(user._id)}
              className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-2 ${user?.isBlocked
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
                }`}
            >
              {user?.isBlock ? <FiUnlock /> : <FiLock />}

              {user?.isBlock ? "Unblock User" : "Block User"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDetailsModal;