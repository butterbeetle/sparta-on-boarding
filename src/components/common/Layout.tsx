import { Outlet } from "react-router-dom";
import Header from "../ui/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[400px]">
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
