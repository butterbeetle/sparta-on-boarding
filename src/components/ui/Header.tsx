import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLoginStore from "../../store/login.store";
const Header = () => {
  const isLoggedIn = useLoginStore((state) => state.isLoggedIn);
  const nav = useNavigate();
  const logOut = useLoginStore((state) => state.logOut);

  // const { data } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => api.auth.getUserInfo(),
  // });

  // console.log("DATA___", data);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        logOut();
        nav("/login", { replace: true });
      },
      1000 * 60 * 10
    );

    return () => {
      clearTimeout(timeout);
    };
  }, [isLoggedIn, logOut, nav]);

  const onLogInHandler = () => {
    if (isLoggedIn) {
      logOut();
    } else {
      nav("/login");
    }
  };
  return (
    <header className="border border-b-2 border-b-red-400 mb-4 p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        On-Boarding
      </Link>
      <div className="flex gap-x-2 items-center">
        {isLoggedIn && <Link to="/my">마이페이지</Link>}
        <div
          onClick={onLogInHandler}
          className="text-sm px-2 py-1 bg-red-200 rounded-md cursor-pointer select-none
      hover:bg-red-300
      active:bg-red-400 active:shadow-[inset_0px_1px_4px]"
        >
          {isLoggedIn ? "로그아웃" : "로그인"}
        </div>
      </div>
    </header>
  );
};

export default Header;
