import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

function Form(props) {
  console.log(props)

  const onChange = (evt) => {
    props.inputChange(evt.target.name, evt.target.value)
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.postQuiz(props.form)

    // Display success message and reset the form

  }




  // Your submit logic here


  // Check if any input has a value less than two characters




  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        value={props.form.newQuestion}
        id="newQuestion"
        maxLength={50}
        onChange={onChange}
        name="newQuestion"
        placeholder="Enter question"
      />
      <input
        value={props.form.newTrueAnswer}
        id="newTrueAnswer"
        maxLength={50}
        onChange={onChange}
        name="newTrueAnswer"
        placeholder="Enter true answer"
      />
      <input
        value={props.form.newFalseAnswer}
        id="newFalseAnswer"
        maxLength={50}
        onChange={onChange}
        name="newFalseAnswer"
        placeholder="Enter false answer"
      />
      <button disabled={props.form.newQuestion.trim().length < 1 || props.form.newTrueAnswer.trim().length < 1 || props.form.newFalseAnswer.trim().length < 1} id="submitNewQuizBtn" >
        Submit new quiz
      </button>
    </form>
  );
};



export default connect((state) => state, actionCreators)(Form);
