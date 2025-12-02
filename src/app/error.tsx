"use client";

import { ErrorBoundary } from "@/components/ErrorBoundary";

const ErrorPage = () => {
  return (
    <ErrorBoundary>
      <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Oops! An error occurred.
        </h1>
        <p className="text-gray-600">
          We apologize for the inconvenience. Please try refreshing the page or
          come back later.
        </p>
      </div>
    </ErrorBoundary>
  );
};

export default ErrorPage;
