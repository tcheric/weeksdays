import { useState } from 'react'
import './App.css'
import Grid from "./Grid"

function App() {
  const [count, setCount] = useState(0)
  const weeks = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
  const years = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75]

  return (
    <>
      <div className="wks-ctnr">
        <div className="x-axis">
          {weeks.map(i => {
            return <span key={i}>{i}</span>
          })}
        </div>
        <div className="sub-ctnr">
          <div className="y-axis">
            {years.map(i => {
              return <span key={i}>{i}</span>
            })}
          </div>
          <Grid/>
          
        </div>
      </div>
    </>
  )
}

export default App
