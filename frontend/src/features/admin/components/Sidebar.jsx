import {
  FiHome,
  FiFilm,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
} from "react-icons/fi";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome },
  { id: "movies", label: "Movies", icon: FiFilm },
  { id: "users", label: "Users", icon: FiUsers },
  { id: "settings", label: "Settings", icon: FiSettings },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  activeTab,
  setActiveTab,
}) {
  return (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"} bg-gray-900 text-white transition-all`}
    >
      <div className="p-4 flex justify-between">
        {sidebarOpen && <h1 className="font-bold" >Admin</h1>}

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center px-4 py-3 ${
              activeTab === item.id ? "bg-blue-600" : "hover:bg-gray-800"
            }`}
          >
            <item.icon />
            {sidebarOpen && <span className="ml-3">{item.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
