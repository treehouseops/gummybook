import React from "react";

const ImageWithTextBox = ({ src, alt, text }) => {
  return (
    <div className="image-container">
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", border: "2px solid black" }}
      />
      <div className="text-box">{text}</div>
    </div>
  );
};

export default ImageWithTextBox;
