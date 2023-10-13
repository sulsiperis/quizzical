import React from "react"
import Intro from "./components/Intro"
import Questions from "./components/Questions"
import Categories from "./Categories";
import Loading from "./components/Loading";

export default function App() {
/**
* 1. two screens (start and questions)
* 2. pull 6 questions from API
* 3. Tally correct answers after "check answers is clicked"
* 4. styled and polished
*/
    const [start, setStart] = React.useState(false);
    const [quizData, setQuizData] = React.useState()
    const [category, setCategory] = 
        React.useState("https://opentdb.com/api.php?amount=6&category=9&difficulty=easy&type=multiple")
    
    /*React.useEffect(() => {        
        fetchData(category)
    }, []) */
    const [err, setErr] = React.useState()
    const catTitle = Categories.find(el => { return el.url===category }).title;
    function fetchData(url) {
        fetch(url) 
            .then(res => res.json())
            .then(data => setQuizData(data))
            .catch(err => {handleErr(err)})
            //.catch(err => {console.log(err)})
    }

    function letsStart() {
        setErr()
        resetData()
        fetchData(category)
        setStart(true)
    }
    function goToIntro() {
        setStart(false)
    }

    function chCategory(url) {        
        setCategory(url)
        
    //fetchData(category)
    }

    function resetData() {
        setQuizData()
    }
    function handleErr(errMsg) {
        
        const errDelay = setTimeout(() => {
            setErr(errMsg) 
            setStart(false)
        }, 6000)        
    }
    //console.log(category)   
    return (
           <main>
                { err && <p className="error">Database connection error. Please try again later.</p> }
                {                     
                    !start?
                    <Intro Cat={Categories} start={letsStart} changeCategory={chCategory} currCategory={category} />: 
                    quizData === undefined?
                    Loading: 
                    <Questions
                        category={catTitle}
                        data={quizData}
                        getData={() => fetchData(category)}
                        changeCategory={() => goToIntro()}
                        reset={resetData}
                    />
                } 
                
           </main>           

        
    )
}