import React, {  useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TrainlyApi from "../api/TrainlyApi";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

// const Console = prop => (
//     console[Object.keys(prop)[0]](...Object.values(prop))
//     ,null // ➜ React components must return something 
//   )

function Quiz(){
    const { quizId } = useParams();

    const [complete, setComplete] = useState(false)
    const [quiz, setQuiz] = useState([]);
    const [doneQuiz, setDoneQuiz] = useState({})
    

    useEffect(function getQuizFromServer(){
        async function getQuiz(){
            setQuiz(await TrainlyApi.getQuiz(quizId));
            setDoneQuiz(await TrainlyApi.getQuiz(quizId))
            console.log(doneQuiz)
        };
        getQuiz()
    });


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

    async function handleSubmit(event){
        event.preventDefault()
        const res = await TrainlyApi.gradeQuiz(doneQuiz, setComplete)
        setDoneQuiz(res);
        setComplete(true)
    }

    if(complete){
        return <Redirect to="/assignments" />
    }

    return (
        <div className="container">
            {/* <Console log={quiz.questions} /> */}
            <h2 className="display-2">{quiz.name}</h2>
            <p>{quiz.description}</p> <br />
            <p><b>Instructions: </b>{quiz.instructions}</p> <br />
            <Form onSubmit={(event) => handleSubmit(event)}>
                <ol>
                    {quiz.questions ? quiz.questions.map((question) => (
                         !question.linkToContent ? 
                        (<li className="list-item">
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
                                            required="true"
                                        />
                                    </div>
                                ))}
                            </div>
                        </li>)
                        :
                        (<li className="list-item, video-responsive">
                            <iframe
                            width="853"
                            height="480"
                            src={question.linkToContent}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            />
                            {question.answers.map((answer) => (
                                    <div onChange={event => handleChange(event)}>
                                        <Form.Check 
                                            type="radio"
                                            id={`answer-${answer.id}`}
                                            label={answer.answerText}
                                            name={`question-${question.id}`}
                                            value={answer.correct}
                                            required="true"
                                        />
                                    </div>
                                ))}
                        </li>)
                            
                    )) : <div></div>}
                </ol>
                <Button className="btn btn-success" type="submit" >Submit Quiz </Button>
            </Form>
        </div>
    )

};

export default Quiz;