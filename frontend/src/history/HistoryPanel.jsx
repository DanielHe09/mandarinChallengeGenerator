import "react"
import {useState, useEffect} from "react"
import { MCQChallenge } from "../challenge/MCQChallenge"

export function HistoryPanel() {
    const[history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState(null)

    {/*use effect is just a react hook that listens to change in state and runs a function whenever this happens 
        you set what variables it listens to in the second parameter, the dependency array*/}
    useEffect(() =>{
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        setIsLoading(false)
    }

    {/*preparing different return statements based on the status of our page */}
    if (isLoading){
        return <div className="loading">Loading history...</div>
    }
    if(error){
        return <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchHistory}>Retry</button>
        </div>
    }
    
    return <div className="history-panel">
        <h2>History</h2>
        {history.length === 0 ? <p>No Challenges Completed</p> : 
            <div className="history-list">
                {history.map((challenge) => {
                    return <MCQChallenge challenge={challenge} key={challenge.id} showExplanation/>
                })}
            </div>
        }
    </div>
}