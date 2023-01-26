import { Link } from "react-router-dom";
import Card from "../../components/ui/Card";

const Home = () => {
  return (
    <div className="p-6 text-center bg-gray-100 my-14 mx-20 border-4 border-gray-300 rounded-2xl">
      <h1 className="text-3xl">Welcome,</h1>
      <p className="my-5 block">
        This is a jira-like Project Management app develoed using the MERN
        Stack. To get started first click the <strong className="text-teal-600">"New Board"</strong> button bellow:
      </p>
      <div className="block p-5">
      <Link to="/boards/new" className="button bg-teal-600 text-white">
        New Board
      </Link>
      </div>
    </div>
    // <div className="card-container py-5 px-10">
    //   <Card
    //     classes="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-800 text-white"
    //     body="The total number of boards you have is 4. You can create a new board by clicking on the 'New Board' button."
    //     header="Total Boards"
    //     button={{ to: "/boards", text: "All Boards" }}
    //   />
    //   <Card
    //     classes="bg-gradient-to-br from-teal-400 via-teal-500 to-teal-800 text-white"
    //     body="You have created a total of 49 tasks in 4 boards. You can create new tasks by going into a specific board."
    //     header="Total Tasks"
    //   />
    //   <Card
    //     classes="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-800 text-white"
    //     body="You have a total of 18 tasks in your backlog. Move them to the 'To Do' list to get them started."
    //     header="Tasks - Backlog"
    //   />
    //   <Card
    //     classes="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-800 text-white"
    //     body="You have a total of 15 tasks waiting to be done in 3 boards. Move them to the 'In Progress' list when you start doing them."
    //     header="Tasks - To Do"
    //   />
    //   <Card
    //     classes="bg-gradient-to-br from-rose-400 via-rose-500 to-rose-800 text-white"
    //     body="You have a total of 14 tasks in progress in 4 boards. Move them to the 'Completed' list when you are done. "
    //     header="Tasks - In Progress"
    //   />
    //   <Card
    //     classes="bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-800 text-white"
    //     body="You have 20 completed tasks in 3 boards and 23 incomplete tasks in 4 boards. Open a specific board to see what needs to be done inside that board."
    //     header="Tasks - Completed"
    //   />
    // </div>
  );
};

export default Home;
