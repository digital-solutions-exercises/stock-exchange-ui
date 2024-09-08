import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <div data-testid="root-div-id" className="font-quicksand">
      <Header />
      <Outlet />
    </div>
  );
};

export default Root;
