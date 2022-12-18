import { useNavigate } from "react-router-dom";
import BoardForm from "../../components/ui/BoardForm";

const NewBoard = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (payload) => {
    navigate("/boards");
    console.log(payload);
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div>
        <div className="w-fit mb-4 text-left">
          <h1 className="text-3xl text-teal-900">Create a New Board</h1>
        </div>
        <div className="flex border rounded-lg rounded-r-none border-teal-900 overflow-auto">
          <div className="px-10 py-8 bg-white w-[800px]">
            <BoardForm onFormSubmit={handleFormSubmit} />
          </div>
          <div className="bg-teal-900 w-1/5"></div>
        </div>
      </div>
    </div>
  );
};

export default NewBoard;
