import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import Textarea from "./Textarea";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/questions/ask", { question });
      console.log(response.data);
      setQuestion(response?.data?.answer);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <Textarea
        id="question-input"
        label="Your Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="What's your question?"
      />

      <Button type="submit">Ask question</Button>
    </form>
  );
};

export default QuestionForm;
