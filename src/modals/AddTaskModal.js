import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/boardsSlice";

const AddTaskModal = ({ setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState(0);

  const boards = useSelector((state) => state.boards);

  const handleSubmit = () => {
    if (title.trim() !== "") {
      dispatch(addTask({ title, description, dueDate, colIndex: status }));
      setIsTaskModalOpen(false);
    } else {
      alert("Task title cannot be empty.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-4"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full mb-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          {boards?.columns?.map((col, index) => (
            <option key={index} value={index}>
              {col.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setIsTaskModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${
              title.trim() === ""
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500"
            }`}
            disabled={title.trim() === ""}
            onClick={handleSubmit}
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
