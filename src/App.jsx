import { useState, useEffect } from 'react'
import './css/App.css'
import Grid from "./components/Grid"
import Modal from "./components/Modal"
import { useNavigate } from "react-router-dom";
import { GoCalendar } from "react-icons/go";
import { BsChevronCompactRight } from "react-icons/bs";

function App() {
  // Hardcoded data
  const weeks = [1,5,10,15,20,25,30,35,40,45,50]
  const years = [0, 5,10,15,20,25,30,35,40,45,50,55,60,65,70,75]

  // UseState
  const [showModal, setShowModal] = useState(false)


  // UseEffect mousemove listener to fade chev ---
  var timeoutid = 0; 

  const showChevAndFade = (e) => {
    rchev.classList.remove("rchev-fade")
    if (timeoutid) {
      clearTimeout(timeoutid);
      timeoutid = 0;
    }
    timeoutid = setTimeout(() => {
      if (e.target.id !== "rchev") rchev.classList.add("rchev-fade")
    }, 2200);
  }

  useEffect(() => {
    var rchev = document.getElementById("rchev")
    window.addEventListener('mousemove', showChevAndFade)
    return () => {
      window.removeEventListener('mousemove', showChevAndFade);
    }
  }, []);
  // end ---

  const [dob, setDob] = useState(() => {
    const dobLS = localStorage.getItem("dob")
    return (dobLS === null) ? null : dobLS // this is a string
  })

  const [ageWks, setAgeWks] = useState(() => {
    const ageLS = localStorage.getItem("age")
    return (ageLS === null) ? 0 : Number(ageLS)
  })

  const [firstWkDiff, setFirstWkDiff] = useState(() => {
    const fwLS = localStorage.getItem("firstWeek")
    return (fwLS === null) ? 0 : ageWks - Number(fwLS)
  })

  // Helper func for below
  const calcAgeWks = ( year, month, date ) => {
    // Round dobobj to monday of that week
    let dobObj = new Date(Number(year), Number(month-1), Number(date))
    // console.log(dobObj)
    let dayOfBirth = dobObj.getDay() || 7
    if (dayOfBirth !== 1) {
      dobObj.setHours(-24 * (dayOfBirth - 1))
    }
    return Math.floor((new Date() - dobObj) / (7 * 24 * 60 * 60 * 1000));
  }

  // UseEffect calc age
  useEffect(() => {
    if (dob) {
      // Re-calc age and update ageWks usestate and LS
      let date = dob.slice(0,2)
      let month = dob.slice(2,4)
      let year = dob.slice(4,8)
      let weekAge = calcAgeWks(year, month, date)
      localStorage.setItem("age", weekAge)
      setAgeWks(weekAge)

      // If age is different to age in local storage, edit goals
    } else {
      setShowModal(true)
    }
  }
  ,[dob])

  // useNavigate
  const navigate = useNavigate();

  // From age input modal
  const onAdd = ({date, month, year}) => {
    // Calculate age
    const weekAge = calcAgeWks(year, month, date)
    console.log(weekAge)

    // Set dob and Age (weeks) in LS
    const dobStr= date + month + year
    localStorage.setItem("dob", dobStr)
    localStorage.setItem("age", weekAge)
    setDob(dobStr)
    setAgeWks(weekAge)
    setShowModal(false)
  }

  // Arrow nav
  document.onkeydown = (e) => {
    if (e.code === "ArrowRight") navigate(`/week/${ageWks}`)
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
          <Grid ageWeeks={ageWks} firstWeekDiff={firstWkDiff + 1}/>
        </div>
      </div>
      <button 
        className="top-left-button" 
        onClick={()=>{setShowModal(!showModal)}}>
        {/* Input */}
        <GoCalendar/>
      </button>
      <BsChevronCompactRight 
        id="rchev"
        className="right-button chev"
        onClick={() => {navigate(`/week/${ageWks}`)}}>
      </BsChevronCompactRight>
      <Modal
        open={showModal}
        onClose={()=>{setShowModal(!showModal)}}
        onAdd={onAdd}
      />
    </>
  )
}

export default App
