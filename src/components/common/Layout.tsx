import { Outlet, useNavigate } from "react-router-dom";
import useLoginStore from "../../store/login.store";

const Layout = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const nav = useNavigate();
  const logOut = useLoginStore((state) => state.logOut);

  const onLogInHandler = () => {
    if (isLoggedIn) {
      logOut();
    } else {
      nav("/login");
    }
  };

  return (
    <>
      <header className="border border-b-2 border-b-red-400 mb-4 p-4 flex justify-between items-center">
        <div className="font-bold text-lg">On-Boarding</div>
        <div
          onClick={onLogInHandler}
          className="text-xs px-2 py-1 bg-red-200 rounded-md cursor-pointer select-none
          hover:bg-red-300
          active:bg-red-400 active:shadow-[inset_0px_1px_4px]"
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </div>
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
