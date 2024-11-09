import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <header className="border border-b-2 border-b-red-400 mb-4 p-4">
        On-Boarding
      </header>
      <main className="mx-auto max-w-[400px]">
        <div>
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
