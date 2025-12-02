"use client";

import { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-xl text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={32} className="text-red-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-coffee-dark mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-coffee-medium mb-6">
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gold-accent text-coffee-dark px-6 py-3 rounded-full font-bold hover:bg-coffee-dark hover:text-gold-accent transition-all"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
