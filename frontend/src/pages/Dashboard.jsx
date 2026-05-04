import { useEffect, useState } from "react";
import API from "../services/api";
import { Calendar, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/tasks");
      const tasks = res.data;

      const completed = tasks.filter(t => t.status === "Done").length;
      const overdue = tasks.filter(t => 
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "Done"
      ).length;

      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
        overdue
      });

      setRecentTasks(tasks.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard icon={Clock} label="Total Tasks" value={stats.total} color="blue" />
        <StatCard icon={CheckCircle} label="Completed" value={stats.completed} color="green" />
        <StatCard icon={AlertTriangle} label="Overdue" value={stats.overdue} color="red" />
        <StatCard icon={Calendar} label="Pending" value={stats.pending} color="orange" />
      </div>

      <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
      <div className="bg-white rounded-xl shadow-sm border">
        {recentTasks.map(task => (
          <div key={task._id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50">
            <div>
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-500">{task.projectId?.name}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium
              ${task.status === "Done" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}