import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainlyApi from "../api/TrainlyApi";

function AssignmentList(){
    const [assignments, setAssignments] = useState([]);
    const { currentUser } = useContext(UserContext); 
    
    const email = currentUser.email;
    useEffect(function getAssignmentsFromServer(){
        async function getAssignments(){
            setAssignments(await TrainlyApi.getAssignments(email));
        };
        getAssignments()
    }, [email]);

    return (
        <div className="container justify-content-center">
            {assignments.map((a) => (
                <div className="card">
                    <div className="card-body">
                        <h5>{a.name}</h5>
                        <ul>
                            <li className="list-item" key={`${a.id}-description`}>{a.description}</li>
                            <li className="list-item" key={`${a.id}-completed`}>{a.completed ? 'Complete' : 'Incomplete'}</li>
                            <li className="list-item" key='lol'>{a.score}</li>
                        </ul>
                        <Link className="btn btn-primary" to={`/quizzes/${a.id}/${a.quizId}`} >Go To Quiz</Link>
                    </div>
                </div>))}
        </div>
            
        
    )
}


export default AssignmentList;