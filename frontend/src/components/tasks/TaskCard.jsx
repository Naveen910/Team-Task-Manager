// components/tasks/TaskCard.jsx
export default function TaskCard({ task, updateStatus }) {
  const flow = {
    Todo: "In Progress",
    "In Progress": "Review",
    Review: "Done",
    Done: "Todo"
  };

  const priorityColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700"
  };

  return (
    <div className="bg-white p-3 rounded-xl shadow-sm border hover:shadow-md transition">

      <h3 className="text-sm font-semibold text-gray-800">
        {task.title}
      </h3>

      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
        {task.description || "No description"}
      </p>

      {/* Assigned */}
      <div className="text-xs text-gray-500 mt-2">
        👤 {task.assignedTo?.name || "Unassigned"}
      </div>

      {/* Priority */}
      <span className={`text-xs px-2 py-1 rounded mt-2 inline-block ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>

      {/* Due */}
      <div className="text-xs text-gray-400 mt-1">
        Due: {task.dueDate?.slice(0, 10)}
      </div>

      {/* Move */}
      <button
        onClick={() => updateStatus(task._id, flow[task.status])}
        className="mt-3 w-full text-xs bg-gray-100 hover:bg-gray-200 py-1.5 rounded-lg"
      >
        Move → {flow[task.status]}
      </button>
    </div>
  );
}