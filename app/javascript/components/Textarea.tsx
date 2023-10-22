import React, { FC, ChangeEvent } from "react";

interface TextAreaProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  cols?: number;
  required?: boolean;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  rows = 3,
  cols = 30,
  required,
}) => {
  return (
    <div className="textarea-group">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        aria-label={label}
        style={{
          width: "100%",
          borderRadius: 2,
          border: "2px solid #000",
          margin: "8px 0",
          boxSizing: "border-box",
          padding: "8px 16px",
          fontSize: 16,
        }}
        required={required}
      />
    </div>
  );
};

export default TextArea;
