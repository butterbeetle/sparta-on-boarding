import * as Sentry from "@sentry/react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (import.meta.env.NODE_ENV === "production") {
      Sentry.withScope((scope) => {
        scope.setExtra("componentStack", errorInfo);
        Sentry.captureException(`Error:${error}`);
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return <p className="text-red-500">Error</p>;
    }

    // 에러가 없으면 children을 return 한다
    return this.props.children;
  }
}

export default ErrorBoundary;
