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

        <div></div>
    </div>
}