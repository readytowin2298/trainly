import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from './PrivateRoutes'
import AssignmentList from '../assignments/AssignmentList';
import QuizPage from '../assignments/QuizPage';
import Quiz from '../assignments/Quiz';
import AdminRoute from "./AdminRoute";
import ToolBox from "../trainer/ToolBox";

function Routes({ login, signup, infoLoaded, setInfoLoaded }) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );
  
    return (
        <div className="pt-5">
          <Switch>
  
            <Route exact path="/">
              <Homepage />
            </Route>
  
            <Route exact path="/login">
              <LoginForm login={login} />
            </Route>
  
            <PrivateRoute exact path="/assignments">
              <AssignmentList infoLoaded={infoLoaded} setInfoLoaded={setInfoLoaded} />
            </PrivateRoute>
  
            <PrivateRoute exact path="/quizzes/complete/:assignmentId/:quizId">
              <Quiz />
            </PrivateRoute>

            <PrivateRoute exact path="/quizzes/:assignmentId/:quizId">
              <QuizPage />
            </PrivateRoute>
  
            <PrivateRoute path="/profile">
              <ProfileForm />
            </PrivateRoute>
  
            <Redirect to="/" />
          </Switch>
        </div>
    );
  }
  
  export default Routes;
  