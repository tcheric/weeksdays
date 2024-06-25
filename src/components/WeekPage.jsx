import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const WeekPage = ({}) => {
  const [goals, setgoals] = useState([])

  const params = useParams();
  
  return (
  <>
    <h1>{params.weekNum}</h1> 
    <div className="outer-goal-ctnr">
      <div className="day-axis"></div>
      <div className="goal-ctnr">
        {goals.map(i => {
          return <Goal></Goal>
        })}
      </div>
    </div>
  </>
  )
}

export default WeekPage
