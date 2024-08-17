import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

const Grid = ({ ageWeeks, firstWeekDiff }) => {

  const populateArr = (lenArr) => {
    let arr =  new Array(lenArr)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  }

  const [mapArrGreen, setmapArrGreen] = useState(()=>{
    console.log("firstWeekDiff", firstWeekDiff)
    console.log("ageWeeks", ageWeeks)
    if (firstWeekDiff !== 0) return populateArr(ageWeeks-firstWeekDiff-1)
    else return populateArr(ageWeeks-firstWeekDiff)
  })

  const [mapArrGreenClick, setmapArrGreenClick] = useState(()=>{
    if (firstWeekDiff !== 0) return populateArr(firstWeekDiff+1)
    else return []
  })

  const [mapArr, setmapArr] = useState(()=>{
    return populateArr(4160-ageWeeks)
  })
  
  // UseEffect to recalculate grid based on {green}
  useEffect(() => {
    let arr = populateArr(ageWeeks-firstWeekDiff)
    setmapArrGreen(arr)
    let arr2 = populateArr(firstWeekDiff)
    setmapArr(arr2)
    let arr3 = populateArr(4160-ageWeeks)
    setmapArr(arr3)

    return () => {
      arr = null
      arr2 = null
      arr3 = null
    }
  }, [ageWeeks, firstWeekDiff])

  const navigate = useNavigate();
  const params = useParams()

  const onClickGreen = ( i ) => {
    const weekNo = ageWeeks - firstWeekDiff + i + 1
    navigate(`/week/${weekNo}`)
  }

  return (
    <div className="grid">
      <ul>
        {mapArrGreen.map(i => {
          return <li 
            className="green" 
            key={i}
            />
        })}
        {mapArrGreenClick.map(i => {
          return <li 
            className="green click" 
            key={i}
            onClick={() => onClickGreen(i)}/>
        })}
        {mapArr.map(i => {
          return <li key={i}></li>
        })}
      </ul>
    </div>
  )
}

export default Grid
