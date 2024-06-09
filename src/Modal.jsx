import { useState } from "react"

const Modal = ({ open, onClose }) => {

  if (!open) return null

  const [date, setdate] = useState("")
  const [month, setmonth] = useState("")
  const [year, setyear] = useState("")
  const [invalid, setInvalid] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (!dob) {
      alert('Please enter a date')
      return
    }
    onAdd({ dob }) //this is an addTask object
    setDob('')
  }

  const isCharNumber = (c) => {
    return c >= '0' && c <= '9';
  }
  
  const invalidReturn = () => {
    setInvalid(true)
    return 
  }

  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
          <form className="dob-form" onSubmit={onSubmit}>
            <label className="label">Enter your birth date:</label>
            <div className="input-container">
              <input 
                className={`input ${invalid ? 'invalid': ''}`}
                id={"input-a"}
                placeholder="dd"
                type='text' 
                value = {date} 
                onChange={(e) => {
                  setInvalid(false)
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
                  if (value.length > 0 && !isCharNumber(value.slice(-1))
                      || value.length == 4 && (age > 80 || age < 0)) {
                    setInvalid(true)
                  }
                  setyear(e.target.value)
                }}
              />
            </div>
            <button className="enter">Enter</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal