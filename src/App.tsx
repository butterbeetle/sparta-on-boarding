import { RouterProvider } from "react-router-dom";
import QueryProvider from "./query/QueryProvider";
import router from "./routes/router";

/**
O 1. 회원가입
O 2. 로그인
O 3. 권한별 라우팅 제어
O 4. tailwind(styled-components)를 이용한 스타일링
O 5. zustand를 통한 client-side 전역 state 관리
O 6. axios, tanstack-query를 통한 외부통신 및 server-side 전역 state 관리
7. Jest(Cypress)를 이용한 테스트
8. Sentry 도입 및 로그 확인
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
