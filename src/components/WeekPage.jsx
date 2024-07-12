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

  // useEffect(() => { 
    // const goalArrStr = localStorage.getItem("goals")
    // const goalArr = JSON.parse(goalArrStr)
    // if (goalArr == null) {
    //   setGoals([])
    // } else {
    //   setGoals([goalArr])
    // }
  // }
  // ,[goals])

  // Random Hooks
  const params = useParams()
  const navigate = useNavigate();

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

  // Toggle specified day of specified  goal
  const toggleGoalData = () => {

  }

  const createNewGoal = (goalName) => {
    const prevWeeklyData = getWeeklyData()
    const currAge = localStorage.getItem("age")
      // First goal ever - create goals obj
    if (prevWeeklyData == null) {
      // Array wrapping Object with goalname as keys, values are each objects 
      const newGoalArr = [{
        goalName: goalName, active: "yes", weeks: {[currAge]: "0000000"}
      }]       
      localStorage.setItem("goals", JSON.stringify(newGoalArr))
      setGoals(newGoalArr)

    } else {
      let newWeeklyData = prevWeeklyData
      let goalPresent = false
      let goalIndex = 0

      for (let obj in prevWeeklyData) {
        if (obj.goalName == goalName) {
          goalPresent = true
          goalIndex = prevWeeklyData.indexOf(obj)
        }
      }
      if (goalPresent) { // goals obj exists + goalName existed
        if (prevWeeklyData[goalIndex][goalName].active == "no") {
          newWeeklyData[goalIndex][goalName].active = "yes"
          // newWeeklyData[goalIndex][goalName].weeks[currAge] = "0000001" how to change week/day data
          localStorage.setItem("goals", JSON.stringify(newWeeklyData))
          setGoals(newWeeklyData)
        }
      } else { // goals obj existed + no goalName key
        newWeeklyData.push({
          goalName: goalName, active: "yes", weeks: {[currAge]: "0000000"}
        })
        localStorage.setItem("goals", JSON.stringify(newWeeklyData))
        setGoals(newWeeklyData)
      }
    }
  }

  const addGoal = () => {
    // TODO
    // setgoals([...goals, newGoal]) //Remove l8r
    setShowInput(false)
    // Update LS
    createNewGoal(newGoal)
    
    // Reset input
    setNewGoal("")
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
            return <Goal name={i.goalName} key={crypto.randomUUID()}></Goal>
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
