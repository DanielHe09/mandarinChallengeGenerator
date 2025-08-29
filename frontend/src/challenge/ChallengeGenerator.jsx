import "react"
import { useState, useEffect } from "react"
import {MCQChallenge} from "./MCQChallenge.jsx"
import {useApi} from "../utils/api.js"

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState("easy")
    const[quota, setQuota] = useState(null)
    //get the makeRequest functions from the useApi custom-made hook
    const {makeRequest} = useApi()

    //useEffect is a React hook that allows you to perform side effects outside/after the normal React render cycle
    useEffect(() => {
        fetchQuota()
    }, [])

    const fetchQota = async () => {
        try {
            const data = await makeRequest("quota")
        }
    }

    {/*function for seeing how many challenge generation tokens the user has left*/}
    const fetchQuota = async () => {}

    const generateChallenge = async() =>{}

    {/*determine how long till the user gets more credits (every 24h the user gets more credits) */}
    const getnextResetTime = () => {}

    return <div className = "challenge-container">
        <h2>Mandarin Challenge Generator</h2>

        {/*displays to users how many tokens/quotas they have left for today */}
        <div className="quota-display">
            {/*defaults to showing 0 if quota value is null*/}
            <p>Challenges reamining today: {quota?.quota_remaining || 0}</p>
            {quota?.quota_remianing === 0 && (
                <p>Next reset: {0}</p>
            )}
        </div>
        {/*a dropdown/<select> component with a label that allows users to select the difficulty of their challenge generated */}
        <div className="difficulty-selector">
            <label htmlFor="difficulty">Select Difficulty</label>
            <select
                id="difficulty"
                //controls which option is currently selected in the dropdown
                value={difficulty}
                /*updates state, e is the event that the selected item in the dropdown changes, and e.target.value is the value of the option
                the user just picked*/
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={isLoading}
            > 
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
        </div>

        {/*displays button to allow user to generate challenge */}
        <button
            onClick={generateChallenge}
            //the button is disabled either when isLoading is true oor when quota_remaining === 0
            disabled={isLoading || quota?.quota_remaining === 0}
            className="generate-button"
        >{isLoading ? "Generating..." : "Generate Challenge"}</button>

        {/*displays an error message to the user when something goes wrong, the && says render this only if error===true */}
        {error && <div className="error-message">
            <p>{error}</p>    
        </div>}

        {challenge && <MCQChallenge challenge={challenge}/>}
    </div>
}