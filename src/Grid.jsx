import { useState, useEffect } from "react"
const Grid = ({ green }) => {

  const populateArr = (lenArr) => {
    let arr =  new Array(lenArr)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  }

  const [mapArrGreen, setmapArrGreen] = useState(()=>{
    return populateArr(green)
  })

  const [mapArr, setmapArr] = useState(()=>{
    return populateArr(4160-green)
  })
  
  // UseEffect to recalculate grid based on {green}
  useEffect(() => {
    let arr = populateArr(green)
    setmapArrGreen(arr)
    
    let arr2 = populateArr(4160-green)
    setmapArr(arr2)

    return () => {
      arr = null
      arr2 = null
    }
  }, [green])

  const onClickGreen = () => {
    alert("Hi")
  }

  return (
    <div className="grid">
      <ul>
        {mapArrGreen.map(i => {
          return <li 
            className="green" 
            key={i}
            onClick={onClickGreen}/>
        })}
        {mapArr.map(i => {
          return <li key={i}></li>
        })}
      </ul>
    </div>
  )
}

export default Grid
