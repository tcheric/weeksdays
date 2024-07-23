import { useState, useEffect } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { GoDash, GoSquareFill } from "react-icons/go";
import { RxDotsVertical } from "react-icons/rx";
import GoalModal from "./GoalModal"

const Goal = ({ name, finishGoal, clearGoal }) => {
  // 1 = dot, 0 = dash
  const dotArr = [1,1,1,0,1,1,1]
  const [showModal, setShowModal] = useState(false)

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
        {dotArr.map(i => {
          if (i == 1) return <GoSquareFill className="dot" key={crypto.randomUUID()}/>
          return <GoDash className="dash" key={crypto.randomUUID()}/>
        })}
    </div>
    <GoalModal
      name={name}
      open={showModal}
      onClose={()=>{setShowModal(!showModal)}}
      finishGoal={finishGoal}
      clearGoal={clearGoal}
    />
  </div>
  )
}

export default Goal
