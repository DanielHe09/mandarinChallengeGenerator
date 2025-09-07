import "react"
import {useState, useEffect} from "react"
import { MCQChallenge } from "../challenge/MCQChallenge"
import {useApi} from "../utils/api"

export function HistoryPanel() {
    const {makeRequest} = useApi()
    const[history, setHistory] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState(null)

    {/*use effect is just a react hook that listens to change in state and runs a function whenever this happens 
        you set what variables it listens to in the second parameter, the dependency array*/}
    useEffect(() =>{
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const data = await makeRequest("my-history")
            setHistory(data.challenges)
        } catch (err) {
            setError(err.message || "Failed to fetch history.")
        } finally {
            setIsLoading(false)
        }

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