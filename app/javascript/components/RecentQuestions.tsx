import React, { useEffect, useState } from "react";

interface Question {
  question: string;
  ask_count: number;
  answer: string;
}

interface RecentQuestionsProps {
  onQuestionClick: (question: string, answer: string) => void;
}

const RecentQuestions: React.FC<RecentQuestionsProps> = ({
  onQuestionClick,
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/questions/recent_questions")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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

  if (error) {
    return (
      <div style={{ marginTop: 12 }}>
        Something went wrong with loading recent questions!
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
