import React, { ReactNode, FC } from "react";

type CommonProps = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  style?: React.CSSProperties;
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
const Button: FC<ButtonProps> = ({
  onClick,
  children,
  loading,
  style,
  disabled,
}) => {
  return (
    <button
      disabled={loading || disabled}
      style={{
        backgroundColor: disabled ? "gray" : "black",
        border: "none",
        borderRadius: 2,
        cursor: "pointer",
        fontSize: 18,
        padding: "8px 16px",
        color: "white",
        fontWeight: "bold",
        ...style,
      }}
      onClick={onClick}
    >
      {loading ? <div className="loader" /> : children}
    </button>
  );
};

export default Button;
