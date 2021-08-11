import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Nav, Navbar, Container, Fade } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainlyApi from "../api/TrainlyApi";


function Quiz(){
    const { quizId } = useParams();
    
    const [quiz, setQuiz] = useState([]);
    const { currentUser } = useContext(UserContext); 
    
    const email = currentUser.email;
    useEffect(function getQuizFromServer(){
        async function getQuiz(){
            setQuiz(await TrainlyApi.getQuiz(quizId));
        };
        getQuiz()
    }, [quizId]);


    return (
        <div className="container">
            <h2 className="display-2">{quiz.name}</h2>
            <p>{quiz.description}</p> <br />
            <p><b>Instructions: </b>{quiz.instructions}</p> <br />
            <ol>
                {quiz.questions ? quiz.questions.map((a) => (
                    <li id={a.id} name={a.id}>
                        <p>{a.questionText}</p>
                        <ul>
                            {a.answers.map((b) => (
                                <li>
                                    <input type="radio" value={b.correct} name={`${a.id}${a.name}`} />
                                    {b.answerText}  
                                </li>
                            ))}
                        </ul>
                    </li>
                )) : <div></div>}
            </ol>
            <button className="btn btn-success" >Submit Quiz </button>
        </div>
    )

};

export default Quiz;