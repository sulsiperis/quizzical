import React from "react";
import { decode } from "html-entities";
import Shuffled from "./Shuffled";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti' 

export default function Questions(props) {
    
    const [QA, setQA] = React.useState("questions")
    const [userAnswers, setUserAnswers] = React.useState([])
    const [correctCount, setCorrectCount] = React.useState(0)
    //console.log(userAnswers);

    //console.log(correctCount)

    React.useEffect(() => {
        props.data && shuffleAnswers(props.data.results)
    }, [props.data])

    function shuffleAnswers(results) {
        let showAnswers = []
        setUserAnswers([])
        if (results && results.length>0) {
            for (let i=0;i<results.length;i++) {                
                    
                    showAnswers = results[i].incorrect_answers.map(answer => {
                        return (
                            decode(answer)
                        )
                    })
                    showAnswers.push(decode(results[i].correct_answer))
                       
                    const randAnswers = showAnswers.slice(0).sort(function(a, b) { return Math.random() - 0.5 })
                    
                    //console.log(randAnswers)
                    setUserAnswers(prev => [...prev, {
                        "question": decode(results[i].question),
                        "shuffledAnswers": randAnswers,
                        "correctAnswer": ""
                    }])                 
  
            }
        }
    }

    function handleChange(event, question) {
        const { value } = event.target

       //console.log(question)
        setUserAnswers(prev => {
            const newArr = []
            for (let i=0;i<props.data.results.length;i++) {
                    const currQuestion = prev[i]
                    if (prev[i].question === question) {
                        
                        const updateAnswer = {...currQuestion, "correctAnswer": value}
                        newArr.push(updateAnswer)
                    } else {
                        newArr.push(currQuestion)
                    }

            }
            return newArr
                
        })          
    }

    console.log(QA)
      
    function checkAnswers() {
        if (QA==="answers") { 
            setCorrectCount(0)

            //console.log(correctCount)

            props.reset()          
            setUserAnswers([])
            props.getData()
        } else {
            const res = props.data.results
            let cnt = 0
            for (let i=0;i<res.length;i++) {
                if (decode(res[i].correct_answer) === userAnswers[i].correctAnswer) {
                    cnt++
                }
            }
            setCorrectCount(cnt)
        }
        setQA(prev => prev==="answers"?"questions":"answers")
        
        //console.log(res)
       
       // console.log(showAnswers)
        
    }
    function intro() {
        setUserAnswers([])
        //props.getData()
        props.changeCategory()
    }

    //console.log(userAnswers)

    const shuffledComp = userAnswers.map((answer, index) => {
        return (
            <div className="questions-item" key={nanoid()}>
                <form>
                    <Shuffled 
                        answers={answer.shuffledAnswers}
                        handleChange={handleChange} 
                        userAnswer={userAnswers[index].correctAnswer}
                        question={answer.question}
                        qa={QA}
                        results={props.data.results}
                        questionIndex={index}
                    />    
                </form>
            </div>
        )
        
    })
    return (
        <div className="questions-content">
            {(correctCount===6) && <Confetti numberOfPieces="234" />}
            <div className="intro-corner-tr">
                <svg width="126" height="131" viewBox="0 0 126 131" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M63.4095 71.3947C35.1213 40.8508 -2.68211 11.7816 1.17274 -29.6933C5.43941 -75.599 39.854 -115.359 82.4191 -133.133C122.797 -149.994 170.035 -140.256 205.822 -115.149C235.947 -94.0141 236.823 -53.8756 246.141 -18.271C256.17 20.0508 282.521 60.8106 260.501 93.7792C237.538 128.159 188.991 133.432 147.931 128.768C112.318 124.723 87.7505 97.6768 63.4095 71.3947Z" fill="#FFFAD1"/>
                </svg>  
            </div>
            <div className="intro-corner-bl">
                <svg width="65" height="62" viewBox="0 0 65 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M-38.919 2.96445C-10.8241 1.07254 20.4975 -5.87426 40.8434 11.5469C63.3629 30.8293 69.9281 62.0589 61.4141 88.8747C53.3376 114.313 28.2818 132.992 -0.0909882 140.475C-23.9759 146.775 -45.6063 132.093 -68.3914 123.11C-92.9153 113.441 -125.606 110.575 -133.794 87.7612C-142.333 63.9714 -124.677 39.0277 -104.912 21.3621C-87.7687 6.03978 -63.0936 4.59238 -38.919 2.96445Z" fill="#DEEBF8"/>
                </svg> 
            </div>
            <h2 className="questions-category" onClick={intro}>{props.data !== undefined && "(" + props.category + ")"}</h2>
                {shuffledComp}               
            <div className="questions-button-wrapper">
                <span>{QA==="answers" && "You scored "+correctCount+"/6 correct answers"}</span>
                <button 
                    className={props.data === undefined?"hideBtn questions-button":"questions-button"}
                    onClick={checkAnswers}>{QA==="questions"?"Check answers":"play again"}
                </button>
                
            </div>
            
        </div>
        
    )
}