// components/tasks/TaskColumn.jsx
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, updateStatus }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 shadow-sm min-h-[400px]">
      <h2 className="font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
            updateStatus={updateStatus}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <p className="text-sm text-gray-400 mt-2">No tasks</p>
      )}
    </div>
  );
}