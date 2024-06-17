import { useState, useEffect } from "react"
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
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  })
  
// Use effect to recalculate grid
useEffect(() => {
  let arr =  new Array(green)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = i
  }
  setmapArrGreen(arr)

  let arr2 =  new Array(4160-green)
  for (let i = 0; i < arr2.length; i++) {
    arr2[i] = i
  }
  setmapArr(arr2)

  return () => {
    arr = null
    arr2 = null
  }
}, [green])

  
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
