import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Nav, Navbar, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainlyApi from "../api/TrainlyApi";

async function AssignmentList(){
    const { currentUser } = useContext(UserContext); 
    const assignments = await TrainlyApi.getAssignments(currentUser.email);

    return (
        <div>
            {assignments.map((a) => (
                <ul>
                    <li>{a.userEmail}</li>
                    <li>{a.quizId}</li>
                    <li>{a.complete}</li>
                    <li>{a.score}</li>
                </ul>
            ))}
        </div>
    )
}

export default AssignmentList;