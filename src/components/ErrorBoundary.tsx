import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Intentionally avoid production console noise; monitoring can be added later.
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container flex min-h-screen items-center justify-center py-24">
          <div className="max-w-lg rounded-3xl border border-border bg-surface p-8 text-center shadow-cell">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Something went wrong
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              The page could not finish loading.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Please retry the page or return home. The rest of the site remains
              available.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={this.handleRetry}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-glow transition hover:bg-accent-glow"
              >
                Retry
              </button>
              <a
                href="/"
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
              >
                Back Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
