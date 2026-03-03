import React from "react";

interface Props {
  text?: string;
  className?: string;
}

const ErrorMessage: React.FC<Props> = ({ text, className }) => {
  if (!text) return null;

  return (
    <span
      role="alert"
      className={`text-sm text-red-600 mt-1 block ${className}`}
    >
      {text}
    </span>
  );
};

export default ErrorMessage;
