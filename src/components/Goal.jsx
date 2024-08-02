import { useState, useEffect } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { GoDash, GoSquareFill, GoCheck , GoX } from "react-icons/go";
import { RxDotsVertical } from "react-icons/rx";
import GoalModal from "./GoalModal"

const Goal = ({ name, goalData, finishGoal, clearGoal, renameGoal, toggleGoalData }) => {
  // 0 = dash, 1 = dot, 2 = success, 3 = fail, 4 = blank
  // const [dotArr, setDotArr] = useState([0,0,0,0,0,0,0])
  const [dotArr, setDotArr] = useState(() => {
    return goalData
  })
  
  const [showModal, setShowModal] = useState(false)

  const toggle = (index) => {
    const prevVal = dotArr[index]
    const newDotArr = dotArr.map((val, i) => {
      if (i == index) {
        if (val == 0) return 1
        if (val == 1) return 0
      } else {
        return val
      }
    })
    setDotArr(newDotArr)
    const dotArrString = newDotArr.join("")
    toggleGoalData(dotArrString, name)
  }

  return (
  <div className="goal">
    <div className="goal-name" onClick={()=>{setShowModal(!showModal)}}>
      <div className="inner-gn-wrapper">
        {name}
        <div className="dot-space">
          <RxDotsVertical className="goal-name-dots"/>
        </div>
      </div>
    </div>
    <div className="dots-lines">
        {dotArr.map((val, index) => {
          if (val == 0) { 
            return <GoDash 
              id={index} 
              className="dash-dot dl-elem" 
              key={crypto.randomUUID()}
              onClick={()=>toggle(index)}/>
          } else if (val == 1) {
            return <GoSquareFill 
              id={index} 
              className="dash-dot dl-elem" 
              key={crypto.randomUUID()}
              onClick={()=>toggle(index)}/>
          } else if (val == 2) {
            return <GoCheck 
              id={index} 
              className="success dl-elem" 
              key={crypto.randomUUID()}/>
          } else if (val == 3) {
            return <GoX
              id={index} 
              className="failure dl-elem" 
              key={crypto.randomUUID()}/>
          } else if (val == 4) {
            return <div
              className="blank dl-elem"
              key={crypto.randomUUID()}/>
          }
        })}
    </div>
    <GoalModal
      name={name}
      open={showModal}
      onClose={()=>{setShowModal(!showModal)}}
      finishGoal={finishGoal}
      clearGoal={clearGoal}
      renameGoal={renameGoal}
    />
  </div>
  )
}

export default Goal
