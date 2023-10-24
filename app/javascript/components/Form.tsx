import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "./Button";
import Textarea from "./Textarea";

interface QuestionFormProps {
  refetchQuestions: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ refetchQuestions }) => {
  const [question, setQuestion] = useState<string>("");
  const [showAskAnother, setShowAskAnother] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [answer, setAnswer] = useState<string>("");

  const answerOutputRef = useRef<HTMLDivElement>(null);

  const showText = (message: string, index: number): void => {
    if (index < message.length) {
      const interval = randomInteger(10, 40);
      if (answerOutputRef.current) {
        answerOutputRef.current.append(message[index++]);
      }
      setTimeout(() => showText(message, index), interval);
    } else {
      setShowAskAnother(true);
      refetchQuestions();
    }
  };

  const randomInteger = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/questions/ask", { question });
      setLoading(false);
      clearAnswer();
      setAnswer(response?.data?.answer || "");
      showText(response?.data?.answer || "", 0);
    } catch (error) {
      console.error("There was an error!", error);
      setLoading(false);
    }
  };

  const clearAnswer = (): void => {
    if (answerOutputRef.current) {
      answerOutputRef.current.innerHTML = ""; // Clear the previous answer output
    }
    setAnswer("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      {!answer?.length ? (
        <Textarea
          id="question-input"
          label="Your Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="What's your question?"
          required
        />
      ) : (
        <div
          style={{
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 12,
            marginTop: 12,
          }}
        >
          {question?.charAt(0).toUpperCase() + question?.slice(1)}
          {/* add ? if question doesn't have it */}
          {question?.trim().slice(-1) !== "?" && "?"}
        </div>
      )}

      {!answer?.length && (
        <Button type="submit" loading={loading}>
          Ask question
        </Button>
      )}

      <div ref={answerOutputRef} style={{ whiteSpace: "pre-wrap" }} />
      {showAskAnother && (
        <Button
          onClick={() => {
            clearAnswer();
            setShowAskAnother(false);
            setQuestion("");
          }}
          style={{
            marginTop: 12,
          }}
        >
          Ask another question
        </Button>
      )}
    </form>
  );
};

export default QuestionForm;
