import axios from 'axios';

import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
  SET_QUIZ_INTO_STATE,
} from "./action-types";

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {
  console.log("clockwise is dispacthed");
  return {
    type: MOVE_CLOCKWISE
  }
}

export function moveCounterClockwise() {
  console.log("counterClocwise is dispatched");
  return {
    type: MOVE_COUNTERCLOCKWISE
  };
}

export function selectAnswer(answer) {
  return { type: SET_SELECTED_ANSWER, payload: answer };
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  };
}


export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  }
}

export function inputChange(name, value) {
  return {
    type: INPUT_CHANGE,
    payload: { name, value }
  }
}



export function resetForm() {
  return {
    type: RESET_FORM
  }
}

// ❗ Async action creators
export function fetchQuiz() {
  return async function (dispatch) {
    console.log('Fetching quiz...');
    axios.get(' http://localhost:9000/api/quiz/next').then(res => {
      dispatch(setQuiz(res.data))
    })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state



  }
}
export function postAnswer(quiz, answer) {
  return async function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    const body = {
      quiz_id: quiz.quiz_id,
      answer_id: answer.answer_id
    }
    axios.post('http://localhost:9000/api/quiz/answer', body).then(res => {
      dispatch(setMessage(res.data.message));
      dispatch(selectAnswer(null));
      dispatch(fetchQuiz());
    })
  }
};


export function postQuiz(quiz) {
  return async function (dispatch) {
    const body = {
      "question_text": quiz.newQuestion,
      "true_answer_text": quiz.newTrueAnswer,
      "false_answer_text": quiz.newFalseAnswer
    };
    axios.post('http://localhost:9000/api/quiz/new', body)
      .then(res => {
        const message = `Congrats: "${quiz.newQuestion}" is a great question!`
        dispatch(setMessage(message));
        dispatch(resetForm());
      })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
