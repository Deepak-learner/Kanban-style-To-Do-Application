import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";

const Board = ({ searchTerm }) => {
  const boards = useSelector((state) => state.boards);

  return (
    <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
      {boards?.columns?.map((col, index) => (
        <Column key={index} colIndex={index} searchTerm={searchTerm} />
      ))}
    </div>
  );
};

export default Board;
