import React, { useState } from 'react';

function NewQuestionForm({ addQuestion }) {
  const [prompt, setPrompt] = useState('');
  const [answers, setAnswers] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    // Construct the new question object
    const newQuestion = {
      prompt,
      answers,
      correctIndex,
    };

    // Send POST request to create a new question
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        addQuestion(data); // Update the parent component with the new question
      })
      .catch((error) => {
        console.error("Error creating question:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Question:</label>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        required
      />

      <div>
        <label>Answers:</label>
        {answers.map((answer, index) => (
          <input
            key={index}
            type="text"
            value={answer}
            onChange={(e) => {
              const newAnswers = [...answers];
              newAnswers[index] = e.target.value;
              setAnswers(newAnswers);
            }}
            required
          />
        ))}
      </div>

      <label>Correct Answer:</label>
      <select
        value={correctIndex}
        onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>

      <button type="submit">Add Question</button>
    </form>
  );
}

export default NewQuestionForm;
