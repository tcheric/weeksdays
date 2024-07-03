import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { GoCheck } from "react-icons/go";
import Goal from "./Goal"

const WeekPage = ({}) => {
  // Hardcoded data
  const days = ["M","T","W","T","F","S","S"]

  const [goals, setgoals] = useState(["Kubernetes", "Leetcode"])
  const [showInput, setShowInput] = useState(false)
  const [newGoal, setNewGoal] = useState("")

  const params = useParams()
  const navigate = useNavigate();

  const getWeeklyData = () => {
    // Goal: "K8s" Week: [1211, 1212, 1213] Daily: "0101011"
    
    // If key not in LS
    
    // If key in LS
    const goalArrStr = localStorage.getItem("goals")
    const goalArrObj = JSON.parse(goalArrStr)

    return goalArrObj
  }

  // Toggle specified day of specified  goal
  const setWeeklyData = () => {

  }

  const addGoal = () => {
    // TODO
    setgoals([...goals, newGoal])
    setNewGoal("")
    setShowInput(false)
    // Update LS
    setWeeklyData(goal, day)
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
          <div className="ag-ctnr">
            <div className="ag-btn-ctnr">
              {!showInput && <button 
                className="add-goal-button plus"
                onClick={() => setShowInput(true)}>
                +
              </button>}
            </div>
            {showInput && <div className="ag-input-ctnr">
              <input 
                className="ag-input"
                type='text' 
                placeholder={"Add Goal"}
                value = {newGoal} 
                onChange={(e) => setNewGoal(e.target.value)}
              />
              <button 
                className="add-goal-button"
                onClick={() => {setShowInput(false)}}>
                X
              </button>
              <button 
                className="add-goal-button"
                onClick={addGoal}>
                <GoCheck className="tick-button"/>
              </button>
            </div>}
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
