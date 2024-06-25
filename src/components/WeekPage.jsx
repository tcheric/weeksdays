import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const WeekPage = ({}) => {
  const [goals, setgoals] = useState([])

  const params = useParams();
  
  return (
  <div className="wk-ctnr">
    <h1>W{params.weekNum}</h1> 
    <div className="outer-goal-ctnr">
      <div className="day-axis"></div>
      <div className="goal-ctnr">
        {goals.map(i => {
          return <Goal></Goal>
        })}
      </div>
    </div>
  </div>
  )
}

export default WeekPage
