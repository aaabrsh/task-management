import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BoardCard from "../../components/ui/BoardCard";
import Spinner from "../../components/ui/spinner";
import { fetchBoards } from "../../reducers/boardSlice";

function BoardsList() {
  let boards = useSelector((state) => state.boards);
  const [spinner, setSpinner] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setSpinner(true);
    dispatch(fetchBoards()).then(() => setSpinner(false));
  }, []);

  return (
    <div className="py-5 px-10 h-full flex flex-col">
      <h1 className="p-5 bg-gray-300/20 text-lg">Your Boards</h1>
      <div className="py-5 relative">
        {spinner && <Spinner />}
        <div className="flex flex-wrap gap-4">
          {boards.length > 0 ? (
            boards.map((board) => <BoardCard board={board} key={board._id} />)
          ) : (
            <div className="block w-full text-lg text-center p-5">
              No Boards Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardsList;
