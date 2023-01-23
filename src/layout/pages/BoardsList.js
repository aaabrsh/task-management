import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardCard from "../../components/ui/BoardCard";
import { fetchBoards } from "../../reducers/boardSlice";

function BoardsList() {
  let boards = useSelector((state) => state.boards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <div className="py-5 px-10">
      <h1 className="p-5 bg-gray-300/20 text-lg">Your Boards</h1>
      <div className="py-5 flex flex-wrap gap-4">
        {boards.length > 0 ? (
          boards.map((board) => <BoardCard board={board} key={board._id} />)
        ) : (
          <div className="block w-full text-lg text-center p-5">
            No Boards Found
          </div>
        )}
      </div>
    </div>
  );
}

export default BoardsList;
