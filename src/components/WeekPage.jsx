import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { GoCheck } from "react-icons/go";
import { BsChevronCompactLeft } from "react-icons/bs";
import Goal from "./Goal"

const WeekPage = ({}) => {
  // Hardcoded data
  const days = ["M","T","W","T","F","S","S"]

  // UseStates
  const [goals, setGoals] = useState(() => {
    const goalArrStr = localStorage.getItem("goals")
    const goalArr = JSON.parse(goalArrStr)
    if (goalArr == null) return []
    else return goalArr
  })
  const [showInput, setShowInput] = useState(false)
  const [newGoal, setNewGoal] = useState("")
  const [weekNoEdit, setWeekNoEdit] = useState(false)
  const [searchedWk, setSearchedWk] = useState("")
  const [invalid, setInvalid] = useState(false)
  
  // UseEffects
  useEffect(() => {
    if (showInput) {
      document.getElementById("ag-input").focus()
    }
  }, [showInput]);

  const cancelWInput = () => {
    setSearchedWk("")
    setWeekNoEdit(false)
    setInvalid(false)
  }

  useEffect(() => {
    const clickCancel = (e) => {
      if (e.target.className !== "weekNo" && e.target.id !=="wn-input") cancelWInput()
    }

    if (weekNoEdit) {
      const wnInput = document.getElementById("wn-input")
      wnInput.focus()
      window.addEventListener('click', clickCancel)
    }
    return () => {
      window.removeEventListener('click', clickCancel);
    }
  }, [weekNoEdit]);

  // Random Hooks
  const params = useParams()
  const navigate = useNavigate();

  // Helper func section START---
  const getWeeklyData = () => {
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
  const getGoalIndex = (goalNameInput, prevWeeklyData) => {
    let goalIndex = -1
    for (let obj of prevWeeklyData) {
      if (obj.goalName == goalNameInput) {
        goalIndex = prevWeeklyData.indexOf(obj)
      }
    }
    return goalIndex
  }

  const isCharNumber = (c) => {
    return c >= '0' && c <= '9';
  }
  // Helper func section END---

  // Arrow nav Event listener 
  document.onkeydown = (e) => {
    switch (e.code) {
      case "ArrowUp":
        let firstWk = Number(localStorage.getItem("firstWeek"))
        let prevWk = Number(params.weekNum) - 1
        if (prevWk >= firstWk) navigate(`/week/${prevWk}`)
        break;
      case "ArrowDown":
        let nextWk = Number(params.weekNum) + 1
        let maxWk = Number(localStorage.getItem("age"))
        if (nextWk <= maxWk) navigate(`/week/${nextWk}`)
        break
      case "ArrowLeft":
        navigate(`/`)
        break
    }
  }

  // Called whenever weekPage is opened
  const autoUpdateGoals = () => {
    // Fetch current week
    const currAge = localStorage.getItem("age")
    // Loop through every goal
    const prevWeeklyData = getWeeklyData()
    let newWeeklyData = prevWeeklyData

    // If goal is active (not "Finished"), fill in missing weeks
    for (const goal of prevWeeklyData) {
      if (goal.active === "yes") {

        // Get latest recorded week by checking keys in obj
        const weeksArr = Object.keys(goal.weeks)        
        let mostRecentWk = 0
        for (let stringWk of weeksArr) {
          if (Number(stringWk) > mostRecentWk) mostRecentWk = Number(stringWk) 
        }

        // Use getGoalIndex to edit newWeeklyData
        const gi = getGoalIndex(goal.goalName, prevWeeklyData)

        // Get restart point, if applicable fill from there
        const rp = Number(prevWeeklyData[gi].restartPoint)
      
        let wkPtr = (mostRecentWk >= rp) ? mostRecentWk : (rp - 1) // include the restart week
        while (wkPtr < currAge) {
          wkPtr = wkPtr + 1
          newWeeklyData[gi].weeks[wkPtr] = "0000000"
          console.log(newWeeklyData)
        }
        localStorage.setItem("goals", JSON.stringify(newWeeklyData)) 
      }
    }
  }
  useEffect(() => {
    autoUpdateGoals()
  }, [])
  

  const createNewGoal = (goalName) => {
    const prevWeeklyData = getWeeklyData()
    const currAge = localStorage.getItem("age")
      // First goal ever - create goals obj
    if (prevWeeklyData == null) {
      // Array wrapping Object with goalname as keys, values are each objects 
      const newGoalArr = [{
        goalName: goalName, active: "yes", restartPoint: "-1", weeks: {[currAge]: "0000000"}
      }]       
      updateGoalStateAndLS(newGoalArr)
      // Set 1st wk ever
      let age = localStorage.getItem("age")
      localStorage.setItem("firstWeek", age)
    } else {
      let newWeeklyData = prevWeeklyData
      const goalIndex = getGoalIndex(goalName, prevWeeklyData)
      if (goalIndex != -1) { // goals obj exists + goalName existed
        if (prevWeeklyData[goalIndex][goalName].active == "no") {
          newWeeklyData[goalIndex].active = "yes"
          newWeeklyData[goalIndex].restartPoint = localStorage.getItem("age")
          updateGoalStateAndLS(newWeeklyData)
        }
      } else { // goals obj exist + no goalName key
        newWeeklyData.push({
          goalName: goalName, active: "yes", restartPoint: "-1", weeks: {[currAge]: "0000000"}
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

  // Toggle specified day of specified goal
  const toggleGoalData = ( dotArrString, goalName ) => {
    const prevWeeklyData = getWeeklyData()
    let newWeeklyData = prevWeeklyData
    const goalIndex = getGoalIndex(goalName, prevWeeklyData)

    const week = params.weekNum
    newWeeklyData[goalIndex].weeks[week] = dotArrString
    localStorage.setItem("goals", JSON.stringify(newWeeklyData)) 
    // UGSALS func above causes setstate conflict as Goal key=uuid() not stored
  }

  // Called thru GoalModal > Goal > WeekPage
  const finishGoal = ( goalName, result ) => {
    // Get relevant entry
    const prevWeeklyData = getWeeklyData()
    let newWeeklyData = prevWeeklyData
    const goalIndex = getGoalIndex(goalName, prevWeeklyData)

    newWeeklyData[goalIndex].active = "no"    
    
    // Get curr day
    const dayIndex = ((new Date()).getDay() + 6 ) % 7 // getDay() start at Sunday :|
    const remainingDays = 7 - dayIndex
    const week = params.weekNum
    
    let dataStr = "".concat(prevWeeklyData[goalIndex].weeks[week].substring(0, dayIndex-1))
    // Set final day as green(2) or red(3)
    if (result == "Success") {
      let dataStr2 = dataStr.concat("2")
      // Set rest of days to blank(4)
      let dataStr3 = dataStr2.concat("4".repeat(remainingDays))
      newWeeklyData[goalIndex].weeks[week] = dataStr3
      updateGoalStateAndLS(newWeeklyData)
    } else {
      let dataStr2 = dataStr.concat("3")
      // Set rest of days to blank(4)
      let dataStr3 = dataStr2.concat("4".repeat(remainingDays))
      newWeeklyData[goalIndex].weeks[week] = dataStr3
      updateGoalStateAndLS(newWeeklyData)
    }
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

  const searchWeek = () => {
    console.log("Search")
    let sw = Number(searchedWk)
    let fw = Number(localStorage.getItem("firstWeek"))
    let age = Number(localStorage.getItem("age"))
    if (sw < fw || sw > age) {
      setInvalid(true)
    } else {
      navigate(`/week/${sw}`)
      setWeekNoEdit(false)
      setSearchedWk("")
    }
  }
  
  const getGoalDataArr = ( goalName ) => {
    const weeklyData = getWeeklyData()

    const gi = getGoalIndex(goalName, weeklyData)
    let strData = weeklyData[gi].weeks[params.weekNum]

    // If that week has no data, do not show the goal at all
    if (strData === undefined) return -1

    let arrData = strData.split('')
    return arrData
  }

  return (
  <>
    <div className="wk-ctnr">
      {!weekNoEdit && <h1 
        className="weekNo" 
        onClick={()=>{
          setWeekNoEdit(true)
        }}>
          W{params.weekNum}
        </h1>
      } 
      {weekNoEdit && <div id="wn-ctnr">
        <h1 id="wn-w">W</h1>
        <input 
        id="wn-input"
        className={`${invalid ? "invalid" : ''}`}
        type='text' 
        spellCheck="false"
        autoComplete="off" 
        value = {searchedWk} 
        onChange={(e) => {
          if (invalid) setInvalid(false)
          let value = e.target.value
          if (value.length > 4
              || (value.length > 0 && !isCharNumber(value.slice(-1)))) {
              return
          }
          setSearchedWk(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.code == "Enter") searchWeek()
          if (e.code == "Escape") cancelWInput()
        }}
        />
      </div>}
      <div className="outer-goal-ctnr">
        <div className="day-axis">
          {days.map(i => {
            return <span key={crypto.randomUUID()}>{i}</span>
          })}
        </div>
        <div className="goal-ctnr">
          {goals.map(i => {
            return (getGoalDataArr(i.goalName) !== -1) && <Goal
              name={i.goalName}
              key={crypto.randomUUID()}
              goalData={getGoalDataArr(i.goalName)}
              finishGoal={finishGoal}
              clearGoal={clearGoal}
              renameGoal={renameGoal}
              toggleGoalData={toggleGoalData}
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
                  if (e.code == "Escape") setShowInput(false)
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
    <BsChevronCompactLeft 
      className="left-button chev"
      onClick={() => {navigate(`/`)}}>
    </BsChevronCompactLeft>
  </>
  )
}

export default WeekPage
