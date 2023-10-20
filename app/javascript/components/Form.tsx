import React, { useState } from "react";
import axios from "axios";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/questions/ask", { question });
      console.log(response.data);
      setQuestion("");
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;
