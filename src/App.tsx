import { RouterProvider } from "react-router-dom";
import QueryProvider from "./query/QueryProvider";
import router from "./routes/router";

/**
- [O]  zustand, tanstack query, tailwind css(또는 styled-components), react-router-dom 세팅
- [O]  환경변수 세팅 및 폴더구조 구성하기
- [?]  json placeholder를 이용하여 외부 통신 테스트 하기
- [ ]  JWT 기술분석 : access, refresh token의 개념과 관리전략 blog 작성
- [O]  회원가입, 로그인, 마이페이지 페이지 컴포넌트 구현
    - 필수기능 : 회원가입, 로그인, 프로필 변경
- [O]  tailwind 또는 styled-components를 이용한 스타일링
- [O]  JWT 인증서버를 활용하여 access token 기반 페이지 권한 처리(라우팅 제어)
 */
function App() {
  return (
    <>
      <QueryProvider>
        <RouterProvider router={router} />
      </QueryProvider>
    </>
  );
}

export default App;
