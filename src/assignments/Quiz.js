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
    
    const email = currentUser.email;
    useEffect(function getQuizFromServer(){
        async function getQuiz(){
            setQuiz(await TrainlyApi.getQuiz(quizId));
            console.log(quiz)
        };
        getQuiz()
    }, [quizId]);



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
                                <h5 className="display-5">{question.questionText}</h5>
                                {question.answers.map((answer) => (
                                    <Form.Check 
                                    type="radio"
                                    id={`quiz-${answer.id}`}
                                    label={answer.answerText}
                                    value={answer.correct}
                                />
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