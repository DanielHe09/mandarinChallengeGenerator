import "react"
import { useState } from "react"

//this component represents one of the challenges generated
/*decided to make this it's own separate component because we will have multiple challenges shown on the website in the history tab
so it's good to make it a reusable component
*/
export function MCQChallenge(challenge, showExplanation = false) {
    const [selectedoption, setSelectedOption] = useState(null)
    const[shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)

    {/*want the options to be JSON, so if they're strings we parse them into json */}
    const options = typeof challenge.options === "string"
        ? JSON.parse(challenge.options)
        :challenge.options
    
    {/*function that handles when the user selects an option */}
    const handleOptionSelect = (index) => {
        //if the user has already selected an option we return without doing anything, else we record the index of their selection
        if (selectedoption !== null) return;
        setSelectedOption(index)
        setShouldShowExplanation(true)
    }

    {/*function that checks if an option (selected) is correct or not */}
    const getOptionClass = (index) => {
        if (selectedOption === null) return "option"

        if (index === challenge.correct_answer_id){
            return "option correct"
        }

        //this if statement does not make sense lol
        if (selectedOption === index && index !== challenge.correct_answer_id){
            return "option incorrect"
        }

        return "option"
    }

    return <div className="challenge-display"></div>
}