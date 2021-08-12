import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Nav, Navbar, Container, Fade } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainlyApi from "../api/TrainlyApi";
import Form from 'react-bootstrap/Form'

// const Console = prop => (
//     console[Object.keys(prop)[0]](...Object.values(prop))
//     ,null // ➜ React components must return something 
//   )

function Quiz(){
    const { quizId } = useParams();
    console.log('*****************************')
    const [quiz, setQuiz] = useState([]);
    const { currentUser } = useContext(UserContext); 
    
    const [doneQuiz, setDoneQuiz] = useState({})

    const email = currentUser.email;
    useEffect(function getQuizFromServer(){
        async function getQuiz(){
            setQuiz(await TrainlyApi.getQuiz(quizId));
            setDoneQuiz(quiz)
            console.log(quiz)
        };
        getQuiz()
    }, [quizId]);


    function handleChange(event){
        const questions = [...doneQuiz.questions]
        const questionId = Number(event.target.name.split('-')[1]);
        const answerId = Number(event.target.id.split('-')[1]);
        for(let question of questions){
            if(question.id === questionId){
                for(let answer of question.answers){
                    if(answer.id === answerId){
                        answer.selected = true
                    } else {
                        answer.selected = false
                    }
                }
            }
        }
        setDoneQuiz({
            ...quiz, questions : questions
        })
        console.log(doneQuiz)
    }

    function setGender(event){
        console.log(event.target.value)
    }


    return (
        <div className="container">
            {/* <Console log={quiz.questions} /> */}
            <h2 className="display-2">{quiz.name}</h2>
            <p>{quiz.description}</p> <br />
            <p><b>Instructions: </b>{quiz.instructions}</p> <br />
            <Form >
                <ol>
                    {quiz.questions ? quiz.questions.map((question) => (
                        <li className="list-item">
                            <div key={`default-radio-${question.id}`} className="mb3">
                                <p className="">{question.questionText}</p>
                                {question.answers.map((answer) => (
                                    <div onChange={event => handleChange(event)}>
                                        <Form.Check 
                                            type="radio"
                                            id={`answer-${answer.id}`}
                                            label={answer.answerText}
                                            name={`question-${question.id}`}
                                            value={answer.correct}
                                        />
                                    </div>
                                ))}
                            </div>
                        </li>
                            
                    )) : <div></div>}
                </ol>
            </Form>
            <button className="btn btn-success" >Submit Quiz </button>
        </div>
    )

};

export default Quiz;