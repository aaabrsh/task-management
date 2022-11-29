import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <div className="flex-grow px-10 py-5">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
