import { FC } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-5" role="alert">
      <ExclamationCircleIcon className="h-5 w-5 mr-2 text-red-600" />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default ErrorMessage;
