import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Goal from "./Goal"

const WeekPage = ({}) => {
  // Hardcoded data
  const days = ["M","T","W","T","F","S","S"]

  const [goals, setgoals] = useState(["Knitting"])

  const params = useParams();
  
  return (
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
      </div>
    </div>
  </div>
  )
}

export default WeekPage
