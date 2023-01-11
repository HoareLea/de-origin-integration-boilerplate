import React from "react";

interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
}

const Button: React.FC<ButtonProps> = ({
  children,
}: ButtonProps): JSX.Element => {
  return <button type="button">{children}</button>;
};

export default Button;
