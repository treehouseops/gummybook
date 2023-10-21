// Import React
import React, { ReactNode, FC } from "react";

type CommonProps = {
  children: ReactNode;
};

type ClickableButtonProps = CommonProps & {
  onClick: () => void;
  type?: "button"; // Optional: default to 'button' if not 'submit'
};

type SubmitButtonProps = CommonProps & {
  onClick?: never; // Ensure `onClick` is not provided
  type: "submit";
};

type ButtonProps = ClickableButtonProps | SubmitButtonProps;

// Create and export the Button component
const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      style={{
        backgroundColor: "black",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        fontSize: 18,
        padding: "8px 16px",
        color: "white",
        fontWeight: "bold",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
