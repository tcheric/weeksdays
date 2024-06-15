import { useState } from "react"
const Grid = ({ green }) => {

  const [mapArrGreen, setmapArrGreen] = useState(()=>{
    let arr =  new Array(green)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  })

  const [mapArr, setmapArr] = useState(()=>{
    let arr =  new Array(4160-green)
    // let arr =  new Array(1211)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  })
  
  return (
    <div className="grid">
      <ul>
        {mapArrGreen.map(i => {
          return <li className="green" key={i}>{}</li>
        })}
        {mapArr.map(i => {
          return <li key={i}>{}</li>
        })}
      </ul>
    </div>
  )
}

export default Grid
