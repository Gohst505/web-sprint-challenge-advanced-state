// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux';
import * as types from './action-types';

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch(action.type){
    
    case types.MOVE_CLOCKWISE:
      return state == 0 ? state = 5 : state - 1;
    case types.MOVE_COUNTERCLOCKWISE:
      return state == 5 ? state = 0 : state + 1;
    default:
      return state;
  }
}

const initialQuizState = null
function quiz(state = initialQuizState, action) {
  switch(action.type){
    case types.SET_QUIZ_INTO_STATE:
      return state = action.payload;
      default :
      return state;
  }
}

const initialSelectedAnswerState = null
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch(action.type){
    case types.SET_SELECTED_ANSWER:
      return state = action.payload;
      default:
        return state;
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch(action.type){
    case types.SET_INFO_MESSAGE:
      return state = action.payload;
    default:
      return state;
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}

export function form(state = initialFormState, action) {
  switch(action.type){
    case types.RESET_FORM:
      return state = initialFormState;
    case types.INPUT_CHANGE:{
      const {id, value} = action.payload;
      return {...state, [id]: value}}
    default:
      return state;
    }
  }


export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
