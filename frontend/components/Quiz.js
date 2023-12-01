import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import * as actionCreators from '../state/action-creators';

 function Quiz(props) {
console.log(props)
  useEffect(() => {
    
   if (!props.quiz) props.fetchQuiz()
  }, [])

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswer?.answer_id === props.quiz.answers[0].answer_id ? 'answer selected' : 'answer'}>
                {props.quiz.answers[0].text}
                <button onClick={() => props.selectAnswer(props.quiz.answers[0])}>
                  {props.selectedAnswer?.answer_id === props.quiz.answers[0].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>

              <div className={props.selectedAnswer?.answer_id === props.quiz.answers[1].answer_id ? 'answer selected' : 'answer'}>
              {props.quiz.answers[1].text}
                <button onClick={() => props.selectAnswer(props.quiz.answers[1])}>
                {props.selectedAnswer?.answer_id === props.quiz.answers[1].answer_id ? 'SELECTED' : 'Select'}
                </button>
              </div>
            </div>

            <button disabled={props.selectedAnswer === null} onClick={() => props.postAnswer(props.quiz, props.selectedAnswer)} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => st, actionCreators)(Quiz)