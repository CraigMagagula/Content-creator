
import React from 'react';

interface ErrorAlertProps {
  message: string;
  onClose: () => void;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
  return (
    <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded-lg relative shadow-md" role="alert">
      <div className="flex">
        <div className="py-1">
          <svg className="fill-current h-6 w-6 text-red-400 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-.99-12L10 10.01l.99-4.02h-1.98zm0 5L10 15.01l.99-4.02h-1.98zM10 11.01V6h.01l-.01 5.01zM10 16v-3h.01l-.01 3z"/>
            <path d="M12.872 6.138a.999.999 0 10-1.745-.884L10 7.116 8.873 5.254a.999.999 0 10-1.745.884L7.482 8H6a1 1 0 000 2h1.482l-1.354 1.862a.999.999 0 101.745.884L10 10.884l1.127 1.862a.999.999 0 101.745-.884L11.518 10H13a1 1 0 100-2h-1.518l1.39-1.862zM10 12c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1z"/>
            <path d="M11 7h-2v5h2V7zm0 6h-2v2h2v-2z"/>
          </svg>
        </div>
        <div>
          <p className="font-bold">Error</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-300 hover:text-red-100"
        aria-label="Close error alert"
      >
        <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
        </svg>
      </button>
    </div>
  );
};
