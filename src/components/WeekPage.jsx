import { useState, useEffect } from 'react'

const WeekPage = ({  }) => {
  const [goals, setgoals] = useState([])

  return (
  <>
    <h1>W1040</h1>
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
