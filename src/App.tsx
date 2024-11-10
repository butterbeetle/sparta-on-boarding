import * as Sentry from "@sentry/react";
import { RouterProvider } from "react-router-dom";
import QueryProvider from "./query/QueryProvider";
import router from "./routes/router";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN_CODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

function App() {
  return (
    <>
      <Sentry.ErrorBoundary fallback={<p>에러발생</p>}>
        <button
          onClick={() => {
            throw new Error("Test");
          }}
        >
          에러
        </button>
        <QueryProvider>
          <RouterProvider router={router} />
        </QueryProvider>
      </Sentry.ErrorBoundary>
    </>
  );
}

export default App;
