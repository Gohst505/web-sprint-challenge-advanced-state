import axios from 'axios';
import * as types from './action-types';

// ❗ You don't need to add extra action creators to achieve MVP
export function moveClockwise() {return {type: types.MOVE_CLOCKWISE}}

export function moveCounterClockwise() {return {type: types.MOVE_COUNTERCLOCKWISE} }

export function selectAnswer(answer_id) { return {type: types.SET_SELECTED_ANSWER, payload: answer_id}}

export function setMessage() {return {type: types.SET_INFO_MESSAGE}}

export function setQuiz() {return {type: types.SET_QUIZ_INTO_STATE}}

export function inputChange({id, value}) {return {type: types.INPUT_CHANGE, payload: {id,value}}}//event target ids and event target values

export function resetForm() {return {type: types.RESET_FORM} }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    dispatch({type: types.SET_QUIZ_INTO_STATE, payload:null})
    axios.get('http://localhost:9000/api/quiz/next')
    .then(response =>{
      dispatch({type: types.SET_QUIZ_INTO_STATE, payload: response.data})
    })
    .catch(err => console.error({err}))
  }
}
export function postAnswer(question, answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
    axios.post('http://localhost:9000/api/quiz/answer', {'quiz_id': question, 'answer_id': answer})//may need change
    .then(response =>{
      dispatch({type: types.SET_SELECTED_ANSWER, payload: null});
      dispatch({type: types.SET_INFO_MESSAGE, payload:response.data.message});
      dispatch(fetchQuiz());
    })
    .catch(err => console.error(err))
  }
}
export function postQuiz(form) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post('http://localhost:9000/api/quiz/new', {"question_text": form.newQuestion, "true_answer_text": form.newTrueAnswer, "false_answer_text": form.newFalseAnswer})
    .then(response =>{
      const newQuestion = response.data;
      dispatch({type: types.SET_INFO_MESSAGE, payload: `Congrats: "${newQuestion.question}" is a great question!`});
      dispatch({type: types.RESET_FORM});
    })
    .catch(err => console.error(err))
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
