import React, { useState } from "react";
import QuestionForm from "./Form";
import ImageWithTextBox from "./ImageWithTextBox";
import RecentQuestions from "./RecentQuestions";
import Button from "./Button";

const App = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleQuestionClick = (question: string, answer: string) => {
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        marginBottom: 12,
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
        {selectedQuestion ? (
          <div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginBottom: 12,
                marginTop: 12,
              }}
            >
              {selectedQuestion}
            </div>
            <div
              style={{
                whiteSpace: "pre-wrap",
              }}
            >
              {selectedAnswer}
            </div>
            <Button
              onClick={() => {
                setSelectedQuestion(null);
                setSelectedAnswer(null);
              }}
              style={{
                marginTop: 12,
              }}
            >
              Back
            </Button>
          </div>
        ) : (
          <div>
            <QuestionForm />
            <RecentQuestions onQuestionClick={handleQuestionClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
