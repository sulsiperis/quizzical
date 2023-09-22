import React from "react"
import Intro from "./components/Intro"
import Questions from "./components/Questions"
import Categories from "./Categories";

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
    const catTitle = Categories.find(el => { return el.url===category }).title;
    function fetchData(url) {
        fetch(url) 
            .then(res => res.json())
            .then(data => setQuizData(data))
    }

    function letsStart() {
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
    //console.log(category)   
    return (
           <main>
                { 
                    !start?
                    <Intro Cat={Categories} start={letsStart} changeCategory={chCategory} currCategory={category} />:
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