import React from "react";
import QuestionForm from "./Form";
import ImageWithTextBox from "./ImageWithTextBox";

const App = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          maxWidth: 400,
        }}
      >
        <ImageWithTextBox
          src="/images/gumball.png"
          alt="Gumball"
          text="What's working at Gumroad like?"
        />
        <QuestionForm />
      </div>
    </div>
  );
};

export default App;
