import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";

const Grid = ({ ageWeeks, firstWeekDiff }) => {

  const populateArr = (lenArr) => {
    if (lenArr == -1 || lenArr == 0 || lenArr == 1) return []
    let arr =  new Array(lenArr)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  }

  const [mapArrGreen, setmapArrGreen] = useState(()=>{
    return populateArr(ageWeeks-firstWeekDiff)
  })

  const [mapArrGreenClick, setmapArrGreenClick] = useState(()=>{
    return populateArr(firstWeekDiff)
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
