import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Board from "./components/Board";
import AddTaskModal from "./modals/AddTaskModal";
import { loadFromLocalStorage } from "./redux/boardsSlice";

const App = () => {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  if (!boards || boards.length === 0) {
    return (
      <p className="text-center text-red-500">
        No boards available. Please create a board.
      </p>
    );
  }

  return (
    <div className="bg-custom-blue min-h-screen p-6 ">
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-white text-4xl font-bold">Kanban Board</h1>
        <input
          type="text"
          className="p-2 rounded w-64"
          placeholder="Search tasks..."
          onChange={handleSearch}
        />
        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="bg-button-orange text-white px-4 py-2 rounded-full font-bold"
        >
          + Add New Task
        </button>
      </div>
      <Board searchTerm={searchTerm} />
      {isTaskModalOpen && (
        <AddTaskModal setIsTaskModalOpen={setIsTaskModalOpen} />
      )}
    </div>
  );
};

export default App;
