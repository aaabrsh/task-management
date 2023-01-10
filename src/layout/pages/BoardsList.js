import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardCard from "../../components/ui/BoardCard";
import { fetchAllBoards } from "../../reducers/boardSlice";

function BoardsList() {
  let boards = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBoards());
  }, []);

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
