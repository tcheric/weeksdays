import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Goal from "./Goal"

const WeekPage = ({}) => {
  // Hardcoded data
  const days = ["M","T","W","T","F","S","S"]

  const [goals, setgoals] = useState(["Kubernetes", "Leetcode"])
  const [showInput, setShowInput] = useState(false)
  const [newGoal, setNewGoal] = useState("")

  const params = useParams()
  const navigate = useNavigate();

  const addGoal = () => {
    // TODO
  }

  return (
  <>
    <div className="wk-ctnr">
      <h1>W{params.weekNum}</h1> 
      <div className="outer-goal-ctnr">
        <div className="day-axis">
          {days.map(i => {
            return <span key={crypto.randomUUID()}>{i}</span>
          })}
        </div>
        <div className="goal-ctnr">
          {goals.map(i => {
            return <Goal name={i} key={crypto.randomUUID()}></Goal>
          })}
          <div className={`ag-btn-ctnr ${showInput ? 'input-showing': ''}`}>
            {!showInput && <button 
              className="add-goal-button"
              onClick={() => setShowInput(true)}>
              +
            </button>}
            {showInput && <input 
              className="ag-input"
              type='text' 
              placeholder={"Add Goal"}
              value = {newGoal} 
              onChange={(e) => setNewGoal(e.target.value)}
            />}
            {showInput && <button 
              className="add-goal-button"
              onClick={() => setShowInput(true)}>
              +
            </button>}
          </div>
        </div>
      </div>
    </div>
    <button 
      className="left-button"
      onClick={() => {navigate(`/`)}}>
      Weeks
    </button>
  </>
  )
}

export default WeekPage
