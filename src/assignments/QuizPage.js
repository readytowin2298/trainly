import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Nav, Navbar, Container, Fade } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainlyApi from "../api/TrainlyApi";


function QuizPage(){
    const { quizId, assignmentId } = useParams();
    
    const [quiz, setQuiz] = useState([]);
    const [assignment, setAssignment] = useState([]);
    const { currentUser } = useContext(UserContext); 
    
    const email = currentUser.email;
    useEffect(function getQuizFromServer(){
        async function getQuiz(){
            setQuiz(await TrainlyApi.getQuiz(quizId));
            setAssignment(await TrainlyApi.getAssignment(assignmentId))
            console.log(assignment)
        };
        getQuiz()
    }, [quizId]);


    return (
        <div className="container">
            <h2 className="display-2">{quiz.name}</h2>
            <p>{quiz.description}</p> <br />
            <p><b>Instructions: </b>{quiz.instructions}</p> <br />
            <ul>
                <li>Completed: {assignment.completed ? 'True' : 'False'}</li>
                <li>Score: {assignment.score}</li>
            </ul>
            <Link className="btn btn-success" to={`/quizzes/complete/${quizId}`}>Begin Quiz </Link>
        </div>
    )

};

export default QuizPage;