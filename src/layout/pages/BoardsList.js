import React, { useEffect } from "react";
import BoardCard from "../../components/ui/BoardCard";
import { boards } from "../../temp/boards";

function BoardsList() {
  useEffect(() => {}, []);
  return (
    <div className="py-5 px-10">
      <h1 className="p-5 bg-gray-300/20 text-lg">Your Boards</h1>
      <div className="py-5 flex flex-wrap gap-4">
        {boards.map((board) => (
          <BoardCard board={board} key={board.id} />
        ))}
      </div>
    </div>
  );
}

export default BoardsList;
