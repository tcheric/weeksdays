import { useState, useEffect } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { GoDash, GoCircle } from "react-icons/go";

const Goal = ({ name }) => {
  // 1 = dot, 0 = dash
  const dotArr = [1,1,1,0,1,1,1]
  return (
  <div className="goal">
    <span className="goal-name">name</span>
    <div className="dots-lines">
        {dotArr.map(i => {
          if (i == 1) return <GoCircle className="dot" key={crypto.randomUUID()}/>
          return <GoDash className="dash" key={crypto.randomUUID()}/>
        })}
    </div>
  </div>
  )
}

export default Goal
