import "react"
import {useState, useEffect} from "react"
import { MCQChallenge } from "../challenge/MCQChallenge"

export function HistoryPanel() {
    const[history, setHistory] = useState([])
    const [isloading, setIsLoading] = useState(true)
    const[error, setError] = useState(null)

    useEffect(() =>{
        fetchHistory()
    }, [])

    const fetchHistory = async () => {
        setIsLoading(false)
    }
    
    return <></>
}