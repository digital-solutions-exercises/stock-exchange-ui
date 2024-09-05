import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div
      data-testid="root-div-id"
      className="font-quicksand h-f sm:h-screen grid grid-cols-3 grid-rows-8 auto-rows-fr"
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
