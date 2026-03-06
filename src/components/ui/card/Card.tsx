import React, { ReactNode } from "react";

interface CardProps {
  heading?: string;
  className?: string;
  children: ReactNode;
  headingClass?: string;
}

const Card: React.FC<CardProps> = ({
  heading,
  className,
  children,
  headingClass,
}) => {
  return (
    <div
      className={`rounded-lg border-border bg-card text-card-foreground shadow-sm px-6 py-2 ${className}`}
    >
      {heading && (
        <h5 className={`text-lg font-semibold mb-5 text-black ${headingClass}`}>
          {heading}
        </h5>
      )}
      {children}
    </div>
  );
};

export default Card;
