import React from "react";
import QuestionItem from "./QuestionItem";
import { useState } from 'react';

function QuestionList({ questions, setQuestions }) {
  const [isDeleted, setIsDeleted] = useState(false)

  const handleDelete = (e) => {
    const questionID = e.target.parentNode.id
    const arrayWithoutDeletedQuestion = questions.filter(question => question.id !== parseInt(questionID))
    setQuestions(arrayWithoutDeletedQuestion)
    fetch(`http://localhost:4000/questions/${questionID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
  }

  const handleChange = (e) => {
    const questionID = e.target.parentNode.parentNode.id
    fetch(`http://localhost:4000/questions/${questionID}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        correctIndex: parseInt(e.target.value)
      })
    })
  }
    
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => { return (
          <QuestionItem 
          key={question.id}  
          question={question}
            handleDelete = {handleDelete}
            handleChange = {handleChange}
          />
        )})}
      </ul>
    </section>
  );
}

export default QuestionList;
