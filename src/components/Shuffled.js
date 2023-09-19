import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Shuffled(props) {
        let showAnswers
    
    if (props.qa === "questions") {
        //console.log(props.qa)
        showAnswers = props.answers.map((answer) => {
            //console.log(props.userAnswer, "----" + answer)
            const btnID = nanoid()
            return (
                <span key={nanoid()}>
                    <input
                        type="radio" 
                        name="answer" 
                        value={decode(answer)} 
                        id={btnID}
                        checked={props.userAnswer === decode(answer)}
                        onChange={(event) => props.handleChange(event, props.question)}
                    />
                    <label htmlFor={btnID}>{decode(answer)}</label>
                </span>
            )
        })
    } else {
        showAnswers = props.answers.map((answer) => {
            const correctAnswer = decode(props.results[props.questionIndex].correct_answer)
            const btnID = nanoid()
            let classColor

            //console.log(props.userAnswer, "----" + answer)

            //console.log(cAnswer)

            if (decode(answer) === correctAnswer) {
            
                classColor = "answer_correct"
            
            } else if ((props.userAnswer === decode(answer)) && (decode(answer) !== correctAnswer)) {
                classColor = "answer_wrong"
            }
            return (
                <span key={nanoid()}>
                    <input                        
                        type="radio" 
                        name="answer" 
                        value={decode(answer)} 
                        id={btnID}
                        disabled
                    />
                    <label className={classColor} htmlFor={btnID}>{decode(answer)}</label>
                </span>
            )
        })
    }
    return (
        <>
            <h2 className="questions-title">{props.question}</h2>
            {showAnswers}
        </>
    )
}