import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";

const Root = () => {
  return (
    <>
      <NavBar />
      <Outlet></Outlet>
    </>
  );
};

export default Root;
