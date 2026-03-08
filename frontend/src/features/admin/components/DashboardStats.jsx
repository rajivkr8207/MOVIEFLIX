import { FiFilm, FiUsers, FiStar } from "react-icons/fi";

const stats = [
  {
    label: "Total Movies",
    value: "156",
    icon: FiFilm,
    change: "+12",
    changeType: "increase",
    color: "blue",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    period: "from last month",
  },
  {
    label: "Total Users",
    value: "2,345",
    icon: FiUsers,
    change: "+23%",
    changeType: "increase",
    color: "green",
    bgColor: "bg-green-50",
    textColor: "text-green-600",
    period: "from last month",
  },

  {
    label: "Avg Rating",
    value: "4.8",
    icon: FiStar,
    change: "+0.3",
    changeType: "increase",
    color: "yellow",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    period: "from last month",
  },
];
export default function DashboardStats() {
  const gradients = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    yellow: "from-yellow-500 to-yellow-600",
    emerald: "from-emerald-500 to-emerald-600",
    orange: "from-orange-500 to-orange-600",
  };
  return (
    <div className="space-y-6">
      <div className="transition-all duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`bg-gradient-to-br ${gradients[stat.color]} rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-all duration-300`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-1">
                    {stat.label}
                  </p>
                  <h2 className="text-3xl font-bold mb-2">{stat.value}</h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-semibold ${stat.changeType === "increase" ? "text-green-200" : "text-red-200"}`}
                    >
                      {stat.change}
                    </span>
                    <span className="text-white/60 text-xs">{stat.period}</span>
                  </div>
                </div>
                <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                  <stat.icon size={28} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
