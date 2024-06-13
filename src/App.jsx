import { useState } from 'react'
import './App.css'
import Grid from "./Grid"
import Modal from "./Modal"

function App() {
  const weeks = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
  const years = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80]

  const [showModal, setShowModal] = useState(false)
  const [dobInputted, setDobInputted] = useState(() => {
    const dobLS = JSON.parse(localStorage.getItem("dob"))
    return (dobLS == null) ? false : true
  })

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  const calcAgeWks = ( dateObj ) => {
    return Math.round((new Date() - dateObj) / (7 * 24 * 60 * 60 * 1000));
  }

  const onAdd = ({date, month, year}) => {
    console.log(date, month, year)
    // set dobInputted flag
    setDobInputted(true)

    // Calculate age
    let dobJSObj = new Date(Number(year), Number(month-1), Number(date))
    const weekAge = calcAgeWks(dobJSObj)
    console.log(weekAge)

    // Set dob and Age (weeks) in LS
  
  }

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
      <button 
        className="top-left-button" 
        onClick={toggleModal}>
        Input
      </button>
      <button className="right-button">
        Days
      </button>
      <Modal
        open={showModal}
        onClose={toggleModal}
        onAdd={onAdd}
      />
    </>
  )
}

export default App
