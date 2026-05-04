import { LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-bold text-xl">T</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}