import "react"
import { useState, useEffect } from "react"
import {MCQChallenge} from "./MCQChallenge.jsx"
import {useApi} from "../utils/api.js"

export function ChallengeGenerator() {
    //challenge, isLoading, error, etc. are just variables that aren't connected to anything; they're defined right here
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

    {/*function for seeing how many challenge generation tokens the user has left*/}
    const fetchQuota = async () => {
        try {
            const data = await makeRequest("quota")
        } catch (error) {
            console.log("Error fetching quota:", error)
        }
    }

    {/*function for generating a challenge by calling the generate-challenge endpoint*/}
    const generateChallenge = async() =>{
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("generate_challenge", {
                /*defining the 'options' that we 'POST' to the backend since this is a POST request */
                method: "POST",
                body: JSON.stringify({difficulty})
            })
            setChallenge(data)
            fetchQuota()
        } catch (err) {
            setError(err.message || "Failed to generate challenge.")
        } finally {
            setIsLoading(false)
        }
    }

    {/*determine how long till the user gets more credits (every 24h the user gets more credits) */}
    const getnextResetTime = () => {
        if (!quota?.last_reset_date) return null
        const resetDate = new Date(quota.last_reset_date)
        resetDate.setHours(resetDate.getHours() + 24)
        return resetDate
    }

    return <div className = "challenge-container">
        <h2>Mandarin Challenge Generator</h2>

        {/*displays to users how many tokens/quotas they have left for today */}
        <div className="quota-display">
            {/*defaults to showing 0 if quota value is null*/}
            <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
            {quota?.quota_remaining === 0 && (
                <p>Next reset: {getNextResetTime()?.toLocaleString()}</p>
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