import React from 'react';

export default class ErrorBoundary extends React.Component<{}, {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}>{
  constructor(props: Object) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log(error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI here
      return (
        <div style={{maxWidth: '100vw', padding: 20}}>
          <h1>Something went wrong.</h1>
          <pre style={{whiteSpace: 'pre-wrap', color: '#000'}}>{this.state.errorInfo}</pre>
          <pre style={{whiteSpace: 'pre-wrap', color: '#000'}}>{this.state.error?.message}</pre>
          <div>
            <a href="https://github.com/charisTheo/RNWebview/tree/main#troubleshooting">
              Check this troubleshooting guide
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}