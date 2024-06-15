import { useState, useEffect } from 'react'
import './App.css'
import Grid from "./Grid"
import Modal from "./Modal"

function App() {
  // Hardcoded data
  const weeks = [1,5,10,15,20,25,30,35,40,45,50]
  const years = [5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80]

  // UseState
  const [showModal, setShowModal] = useState(false)
  
  const [dob, setDob] = useState(() => {
    const dobLS = localStorage.getItem("dob")
    return (dobLS === null) ? null : dobLS // this is a string
  })

  const [ageWks, setAgeWks] = useState(() => {
    const ageLS = localStorage.getItem("age")
    return (ageLS === null) ? 0 : Number(ageLS)
  })

  // UseEffect
  useEffect(() => {
    if (dob) {
      console.log("dob inputted")
    } else {
      console.log("Nah not inputted")
      setShowModal(true)
    }
  }
  ,[dob])

  // Open/close modal
  const toggleModal = () => {
    setShowModal(!showModal)
  }

  // Helper func for below
  const calcAgeWks = ( dateObj ) => {
    return Math.round((new Date() - dateObj) / (7 * 24 * 60 * 60 * 1000));
  }

  const onAdd = ({date, month, year}) => {
    // set dobInputted flag
    setDob(true)

    // Calculate age
    let dobJSObj = new Date(Number(year), Number(month-1), Number(date))
    const weekAge = calcAgeWks(dobJSObj)
    console.log(weekAge)

    // Set dob and Age (weeks) in LS
    const dobStr= date + month + year
    localStorage.setItem("dob", dobStr)
    localStorage.setItem("age", weekAge)
    setShowModal(false)
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
          <Grid green={ageWks}/>
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
