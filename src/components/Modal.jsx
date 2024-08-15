import { useState } from "react"
import { FaTimes } from "react-icons/fa";

const Modal = ({ onAdd, open, onClose }) => {

  if (!open) return null

  const [date, setdate] = useState("")
  const [month, setmonth] = useState("")
  const [year, setyear] = useState("")
  const [invalid, setInvalid] = useState(false)
  const [submitInvalid, setSubmitInvalid] = useState(false)
  const [dobExists, setDobExists] = useState(() => {
    let dobLS = localStorage.getItem("dob")
    return (dobLS === null) ? false : true
  })

  const onSubmit = (e) => {
    e.preventDefault()

    if (date.length != 2 || month.length != 2 || year.length != 4) {
      setSubmitInvalid(true)
      return
    }

    if (!invalid) {
      onAdd({ date, month, year })
    }
  }

  const isCharNumber = (c) => {
    return c >= '0' && c <= '9';
  }

  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
          <button 
            className="modal-close" 
            onClick={onClose}>
            {<FaTimes />}
          </button>
          <form 
            className="dob-form" 
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <label className="label">
              {dobExists ? "Clear existing goal data and reset DOB:" : "Enter your birth date:"}
            </label>
            <div className="input-container">
              <input 
                className={`input ${invalid ? 'invalid': ''}`}
                id={"input-a"}
                placeholder="dd"
                type='text' 
                value = {date} 
                onChange={(e) => {
                  setInvalid(false)
                  setSubmitInvalid(false)
                  let value = e.target.value
                  if ((Number(value) > 31) 
                      || (value == "00")
                      || (value.length > 0 && !isCharNumber(value.slice(-1)))){
                    setInvalid(true)
                    return
                  }
                  if (value.length == 2) document.getElementById("input-b").focus()
                  setdate(value)
                }}
              />
              <input 
                className={`input ${invalid ? 'invalid': ''}`}
                id={"input-b"}
                placeholder="mm"
                type='text' 
                value = {month} 
                onChange={(e) => {
                  setInvalid(false)
                  setSubmitInvalid(false)
                  let value = e.target.value
                  if (value == "00" 
                      || Number(value) > 12
                      || (value.length > 0 && !isCharNumber(value.slice(-1)))){
                    setInvalid(true)
                    return
                  }
                  if (value.length == 2) document.getElementById("input-c").focus()
                  setmonth(e.target.value)
                }}
              />
              <input 
                className={`input year ${invalid ? 'invalid': ''}`}
                id={"input-c"}
                placeholder="yyyy"
                type='text' 
                value = {year} 
                onChange={(e) => {
                  let value = e.target.value
                  let age = new Date().getFullYear() - Number(value)
                  if (value.length > 4) return
                  setInvalid(false)
                  setSubmitInvalid(false)
                  if (value.length > 0 && !isCharNumber(value.slice(-1))
                      || value.length == 4 && (age > 80 || age < 0)) {
                    setInvalid(true)
                    return
                  }
                  setyear(e.target.value)
                }}
              />
            </div>
            <button className={`enter txt-btn ${submitInvalid ? 'sub-invalid': ''}`}>Enter</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal