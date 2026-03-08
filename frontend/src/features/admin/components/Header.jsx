import { FiCalendar, FiUsers } from "react-icons/fi";

export default function Header({ activeTab }) {
  return (
    <header className="bg-white h-16 shadow flex justify-between items-center px-6">
      <h2 className="font-semibold capitalize">{activeTab}</h2>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <FiCalendar />
        </button>

        <div className="flex items-center gap-2">
          <FiUsers />
          <span>Admin</span>
        </div>
      </div>
    </header>
  );
}
