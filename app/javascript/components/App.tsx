import React, { useEffect, useState } from "react";
import QuestionForm from "./Form";
import ImageWithTextBox from "./ImageWithTextBox";
import RecentQuestions from "./RecentQuestions";
import Button from "./Button";
import axios from "axios";

export interface Question {
  question: string;
  ask_count: number;
  answer: string;
}

const App = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleQuestionClick = (question: string, answer: string) => {
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
  };

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecentQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/questions/recent_questions");

      setQuestions(response.data);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching recent questions", error);
      setError("Failed to fetch recent questions. Please try again later.");
    }
  };

  useEffect(() => {
    fetchRecentQuestions();
  }, []);

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
          src="/images/gumballwork.png"
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
            <QuestionForm refetchQuestions={fetchRecentQuestions} />
            <RecentQuestions
              questions={questions}
              onQuestionClick={handleQuestionClick}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
