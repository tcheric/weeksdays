import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { GoCheck } from "react-icons/go";
import Goal from "./Goal"

const WeekPage = ({}) => {
  // Hardcoded data
  const days = ["M","T","W","T","F","S","S"]

  // UseState
  const [goals, setGoals] = useState(() => {
    const goalArrStr = localStorage.getItem("goals")
    const goalArr = JSON.parse(goalArrStr)
    // console.log("RAN") //Doesn't run
    if (goalArr == null) {
      return []
    } else {
      return goalArr
    }
  })
  const [showInput, setShowInput] = useState(false)
  const [newGoal, setNewGoal] = useState("")
  
  // UseEffect
  useEffect(() => {
    if (showInput) {
      document.getElementById("ag-input").focus()
    }
  }, [showInput]);

  // Random Hooks
  const params = useParams()
  const navigate = useNavigate();

  // Helper func section START---
  const getWeeklyData = () => {
    // Goals: "K8s" Weeks: [1211, 1212, 1213] Daily: "0101011"
    const goalArrStr = localStorage.getItem("goals")
    if (goalArrStr === null) {
      return null
    } else { // If key in LS
      const goalArrObj = JSON.parse(goalArrStr)
      return goalArrObj
    }
  }

  const updateGoalStateAndLS = (newWeeklyData) => {
    localStorage.setItem("goals", JSON.stringify(newWeeklyData))
    setGoals(newWeeklyData)
  }

  // Get goalIndex from goalName from LS. If no goalName in LS return -1
  const getGoalIndex = (goalName, prevWeeklyData) => {
    let goalIndex = -1
    for (let obj of prevWeeklyData) {
      if (obj.goalName == goalName) {
        goalIndex = prevWeeklyData.indexOf(obj)
      }
    }
    return goalIndex
  }
  // Helper func section END---


  const createNewGoal = (goalName) => {
    const prevWeeklyData = getWeeklyData()
    const currAge = localStorage.getItem("age")
      // First goal ever - create goals obj
    if (prevWeeklyData == null) {
      // Array wrapping Object with goalname as keys, values are each objects 
      const newGoalArr = [{
        goalName: goalName, active: "yes", weeks: {[currAge]: "0000000"}
      }]       
      updateGoalStateAndLS(newGoalArr)
    } else {
      let newWeeklyData = prevWeeklyData
      const goalIndex = getGoalIndex(goalName, prevWeeklyData)
      if (goalIndex != -1) { // goals obj exists + goalName existed
        if (prevWeeklyData[goalIndex][goalName].active == "no") {
          newWeeklyData[goalIndex][goalName].active = "yes"
          updateGoalStateAndLS(newWeeklyData)
        }
      } else { // goals obj existed + no goalName key
        newWeeklyData.push({
          goalName: goalName, active: "yes", weeks: {[currAge]: "0000000"}
        })
        updateGoalStateAndLS(newWeeklyData)
      }
    }
  }

  const addGoal = () => {
    if (newGoal !== "") {
      setShowInput(false)
      createNewGoal(newGoal)
      setNewGoal("") 
    }
  }

  // Toggle specified day of specified  goal
  const toggleGoalData = () => {

  }

  // Called thru GoalModal > Goal > WeekPage
  const finishGoal = ( goalName, result ) => {
    // Get relevant entry
    const prevWeeklyData = getWeeklyData()
    let newWeeklyData = prevWeeklyData
    const goalIndex = getGoalIndex(goalName, prevWeeklyData)

    // console.log(goalIndex)
    // console.log(prevWeeklyData[goalIndex])
    if (prevWeeklyData[goalIndex].active == "yes") {
      newWeeklyData[goalIndex].active = "no"
    }
    // TODO: Catch case if user attempts to finish inactive task, stop at prompt 

    // If-else to set final day as green or red
    if (result == "Success") {
      console.log("success")
    } else if (result == "Failure") {
      console.log("Failure")
    }
    updateGoalStateAndLS(newWeeklyData)
  }

  const renameGoal = ( newGoalName, oldGoalName ) => {
    let newWeeklyData = getWeeklyData()
    const goalIndex = getGoalIndex(oldGoalName, newWeeklyData)

    newWeeklyData[goalIndex].goalName = newGoalName
    updateGoalStateAndLS(newWeeklyData)
  }

  const clearGoal = ( goalName ) => {
    // Get relevant entry
    const prevWeeklyData = getWeeklyData()
    let newWeeklyData = prevWeeklyData
    const goalIndex = getGoalIndex(goalName, prevWeeklyData)
    newWeeklyData.splice(goalIndex, 1)
    updateGoalStateAndLS(newWeeklyData)
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
            return <Goal
              name={i.goalName}
              key={crypto.randomUUID()}
              finishGoal={finishGoal}
              clearGoal={clearGoal}
              renameGoal={renameGoal}
            />
          })}
          <div className="ag-ctnr">
            <div className="ag-btn-ctnr">
              {!showInput && <button 
                className="add-goal-button plus"
                onClick={() => {setShowInput(true)}}>
                +
              </button>}
            </div>
            {showInput && <div className="ag-input-ctnr">
              <input 
                id={"ag-input"}
                type='text' 
                spellCheck="false"
                autoComplete="off" 
                placeholder={"Add Goal"}
                value = {newGoal} 
                onChange={(e) => setNewGoal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code == "Enter") addGoal()
                }}
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
