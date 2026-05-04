export default function StatCard({ icon: Icon, label, value, color }) {
  const colors = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    red: "text-red-600 bg-red-100",
    orange: "text-orange-600 bg-orange-100"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors[color]}`}>
        <Icon size={28} />
      </div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
}