import { LayoutDashboard, FolderOpen, Users } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FolderOpen, label: "Projects", path: "/projects" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r h-screen fixed">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 bg-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold">TF</span>
          </div>
          <h2 className="text-xl font-semibold">TaskFlow</h2>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
                  ? 'bg-purple-100 text-purple-700 font-medium'
                  : 'hover:bg-gray-100 text-gray-700'
                }`
              }
            >
              <item.icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}