import React from "react";
import QuestionForm from "./Form";

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
        <img
          style={{ width: "100%", border: "4px solid black" }}
          src="/images/gumball.png"
          alt="Gumball"
        />
        <QuestionForm />
      </div>
    </div>
  );
};

export default App;
