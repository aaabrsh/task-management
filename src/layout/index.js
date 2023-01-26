import { Outlet } from "react-router-dom";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
