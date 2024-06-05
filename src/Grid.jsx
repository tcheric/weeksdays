import { useState } from "react"
function Grid() {

  const [mapArr, setmapArr] = useState(()=>{
    let arr =  new Array(4160)
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i
    }
    return arr
  })
  
  return (
    <div className="grid">
      <ul>
        {mapArr.map(i => {
          return <li key={i}>{}</li>
        })}
      </ul>
    </div>
  )
}

export default Grid
