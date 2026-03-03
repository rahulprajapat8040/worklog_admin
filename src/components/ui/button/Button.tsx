import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "danger"
  | "none"
  | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variantStyle: Record<ButtonVariant, string> = {
  primary:
    "bg-primary w-full hover:bg-primary/80 text-white p-2 rounded-md font-normal disabled:bg-primary-blug/80 active:scale-97",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-input bg-background hover:bg-accent font-normal hover:text-accent-foreground p-2 rounded-md",
  ghost:
    "border border-stroke-black p-2 rounded-lg font-semibold text-primary-blue",
  none: "text-primary-blue",
  danger: "bg-red-500 text-white p-2 rounded-xl",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className,
  ...props
}) => {
  const buttonClass = `${variantStyle[variant]} ${className}`;
  return (
    <button className={buttonClass} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
