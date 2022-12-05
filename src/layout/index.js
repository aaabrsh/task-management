import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = (props) => {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
