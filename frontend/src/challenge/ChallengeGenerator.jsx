import "react"
import { useState, useEffect } from "react"
import {MCQChallenge} from "./MCQChallenge.jsx"

export function ChallengeGenerator() {
    const [challenge, setChallenge] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [difficulty, setDifficulty] = useState("easy")
    const[quota, setQuota] = useState(null)

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
                value={difficulty}
                /*updates state*/
                onChange={(e) => setDifficulty(e.target.value)}
                disabled={isLoading}
            > 
            </select>
        </div>
    </div>
}