import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";
import Footer from "../pages/Footer";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
      <Footer />
    </>
  );
};

export default Root;
