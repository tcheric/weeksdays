import { useState, useEffect } from 'react'
import { FaDotCircle } from "react-icons/fa";
import { GoDash, GoSquareFill } from "react-icons/go";
import { RxDotsVertical } from "react-icons/rx";

const Goal = ({ name }) => {
  // 1 = dot, 0 = dash
  const dotArr = [1,1,1,0,1,1,1]

  // const [showDots, setShowDots] = useState(false)
  // useEffect(() => {
  //   document.getElementById(name).addEventListener("mouseover", (event) => {setShowDots(!showDots)});
  
  //   return () => {
  //   }
  // }, [])
  
  



  return (
  <div className="goal">
    <div className="goal-name" id={name} onClick={()=>{setShowDots(!showDots)}}>
      <div className="inner-gn-wrapper">
        {name}
        {/* {name}{showDots && <RxDotsVertical className="goal-name-dots"/>} */}
      </div>
    </div>
    <div className="dots-lines">
        {dotArr.map(i => {
          if (i == 1) return <GoSquareFill className="dot" key={crypto.randomUUID()}/>
          return <GoDash className="dash" key={crypto.randomUUID()}/>
        })}
    </div>
  </div>
  )
}

export default Goal
