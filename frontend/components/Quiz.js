import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../state/action-creators';

export function Quiz(props) {

  const {quiz, fetchQuiz} = props;
  if(!props.selectedAnswer){
    useEffect(() => fetchQuiz(), [])
  }

  const handleSelected = evt =>{
    const {selectAnswer} = props;
    selectAnswer(evt.target.id);
  }

  const handleSubmit = evt =>{
    evt.preventDefault();
    const {postAnswer, quiz, selectedAnswer} = props;
    postAnswer(quiz.quiz_id, selectedAnswer);
  }

  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.selectedAnswer == quiz.answers[0].answer_id ? "answer selected" : "answer"}>
                {quiz.answers[0].text}
                <button id = {quiz.answers[0].answer_id} onClick= {handleSelected}>
                  {props.selectedAnswer == quiz.answers[0].answer_id ? "SELECTED" : "select"}
                </button>
              </div>

              <div className={props.selectedAnswer == quiz.answers[1].answer_id ? "answer selected" : "answer"}>
                {quiz.answers[1].text}
                <button id = {quiz.answers[1].answer_id} onClick= {handleSelected}>
                {props.selectedAnswer == quiz.answers[1].answer_id ? "SELECTED" : "select"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onClick={handleSubmit} disabled = {props.selectedAnswer ? false : true}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}export default connect(str => str, actions) (Quiz);
