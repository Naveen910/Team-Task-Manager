// components/projects/CreateProjectModal.jsx
import { useState } from "react";
import API from "../../services/api";
import MemberSelector from "./MemberSelector";

export default function CreateProjectModal({ close, refresh }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    members: []
  });

  const handleSubmit = async () => {
    try {
      await API.post("/projects", form);
      refresh();
      close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-lg font-bold mb-3">Create Project</h2>

        <input
          placeholder="Project Name"
          className="border w-full p-2 mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="border w-full p-2 mb-2 rounded"
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <MemberSelector
          selected={form.members}
          setSelected={(members) =>
            setForm({ ...form, members })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-3 py-2 mt-3 rounded w-full"
        >
          Create Project
        </button>

        <button
          onClick={close}
          className="mt-2 w-full text-sm text-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}