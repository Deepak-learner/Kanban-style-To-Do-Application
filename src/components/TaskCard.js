import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditTaskModal from "../modals/EditTaskModal";
import { deleteTask } from "../redux/boardsSlice";
import { ReactComponent as EditIcon } from "../assets/images/edit.svg";
import { ReactComponent as DeleteIcon } from "../assets/images/delete.svg";
import DeleteConfirmationModal from "../modals/DeleteConfirmationModal";
const TaskCard = ({ colIndex, taskIndex, dataIndex, onDragStart }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const col = boards?.columns?.[colIndex];
  const task = col?.tasks?.[taskIndex];
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  if (!task) return null;
  const handleDelete = (e) => {
    e.stopPropagation();
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = () => {
    dispatch(deleteTask({ colIndex, taskIndex }));
    setIsDeleteModalOpen(false);
  };
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  return (
    <div>
      <div
        onClick={() => setIsTaskModalOpen(true)}
        draggable
        onDragStart={onDragStart}
        data-index={dataIndex}
        className={`bg-white p-4 rounded-md shadow-lg cursor-pointer hover:bg-gray-50 ${
          isOverdue ? "border-2 border-red-500" : ""
        }`}
      >
        <div className="flex justify-between">
          <p className="font-bold text-gray-700">{task.title}</p>
          <div className="space-x-2">
            <EditIcon
              className="inline text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsTaskModalOpen(true);
              }}
            />
            <DeleteIcon
              className="inline text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        </div>
        <p className="text-sm text-gray-500">{task.description}</p>
        {task.dueDate && (
          <p
            className={`text-xs ${
              isOverdue ? "text-red-500" : "text-gray-400"
            }`}
          >
            Due: {task.dueDate}
          </p>
        )}
        <p className="text-xs text-gray-600 mt-2">Status: {col.name}</p>
      </div>
      {isTaskModalOpen && (
        <EditTaskModal
          colIndex={colIndex}
          taskIndex={taskIndex}
          setIsTaskModalOpen={setIsTaskModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          onCancel={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
};
export default TaskCard;