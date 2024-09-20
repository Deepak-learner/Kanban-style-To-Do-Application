import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskStatus, reorderTaskInColumn } from "../redux/boardsSlice";
import TaskCard from "./TaskCard";
const columnColors = {
  0: "bg-red-400",
  1: "bg-yellow-300",
  2: "bg-green-300",
  3: "bg-blue-400",
};
const Column = ({ colIndex, searchTerm }) => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const col = boards?.columns?.[colIndex];
  if (!col || !col.tasks) {
    return null;
  }
  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData("text")
    );
    const destinationIndex = parseInt(e.target.dataset.index, 10);
    if (colIndex === prevColIndex) {
      dispatch(
        reorderTaskInColumn({ colIndex, sourceIndex: taskIndex, destinationIndex })
      );
    } else {
      // Move task to another column
      dispatch(updateTaskStatus({ colIndex, prevColIndex, taskIndex }));
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrag = (e, taskIndex) => {
    e.dataTransfer.setData(
      "text",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };
  const colorClass = columnColors[colIndex % Object.keys(columnColors).length];
  const filteredTasks = col.tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm)
  );
  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      className="w-96 bg-gray-100 p-4 rounded-lg shadow-md"
    >
      <div
        className={`h-8 rounded-t-lg ${colorClass} flex items-center justify-center mb-4`}
      >
        <h2 className="text-lg font-bold text-gray-800">{col.name}</h2>
      </div>
      <div className="space-y-4">
        {filteredTasks.length > 0 &&
          filteredTasks.map((task, index) => (
            <TaskCard
              key={index}
              colIndex={colIndex}
              taskIndex={index}
              onDragStart={(e) => handleOnDrag(e, index)}
              dataIndex={index}
            />
          ))}
      </div>
    </div>
  );
};
export default Column;