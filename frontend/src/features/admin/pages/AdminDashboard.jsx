import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardStats from "../components/DashboardStats";
import MoviesTable from "../components/movie/MoviesTable";
import UsersTable from "../components/user/UserManagement";

const AdminDashboard = () => {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("movies");

  const renderContent = () => {
    switch (activeTab) {
      case "movies":
        return <MoviesTable />;

      case "users":
        return <UsersTable />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Header activeTab={activeTab} />

        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>

      </div>

    </div>
  );
};

export default AdminDashboard;