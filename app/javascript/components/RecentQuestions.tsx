import React from "react";
import { Question } from "./App";

interface RecentQuestionsProps {
  onQuestionClick: (question: string, answer: string) => void;
  loading: boolean;
  error: string;
  questions: Question[];
}

const RecentQuestions: React.FC<RecentQuestionsProps> = ({
  questions,
  onQuestionClick,
  loading,
  error,
}) => {
  if (error) {
    return (
      <div style={{ marginTop: 12 }}>
        Something went wrong with loading recent questions!
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          padding: 16,
        }}
      >
        <div className="loader dark" />
      </div>
    );
  }

  return (
    <div>
      <h3>Recent questions</h3>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {questions.map((q, index) => {
          const { question, answer } = q;
          return (
            <li
              key={index}
              style={{
                borderRadius: 1,
                border: "2px solid black",
                background: "#fff",
                padding: "8px 12px",
                marginBottom: 8,
                cursor: "pointer",
              }}
              onClick={() => onQuestionClick(question, answer)}
            >
              {question}
            </li>
          );
        })}
      </ul>
      {questions.length === 0 && (
        <div style={{ marginTop: 12 }}>No questions yet!</div>
      )}
    </div>
  );
};

export default RecentQuestions;
