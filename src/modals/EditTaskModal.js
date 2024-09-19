import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../redux/boardsSlice";

const EditTaskModal = ({ colIndex, taskIndex, setIsTaskModalOpen }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const col = boards?.columns?.[colIndex];
  const task = col?.tasks?.[taskIndex];

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = () => {
    dispatch(editTask({ title, description, dueDate, colIndex, taskIndex }));
    setIsTaskModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Task</h2>
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
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => setIsTaskModalOpen(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSubmit}
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
