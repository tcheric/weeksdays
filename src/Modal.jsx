import { useState } from "react"

const Modal = ({ open, onClose }) => {

  if (!open) return null

  const [date, setdate] = useState("")
  const [month, setmonth] = useState("")
  const [year, setyear] = useState("")

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
  

  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
          <form className="dob-form" onSubmit={onSubmit}>
            <label className="label">Enter your birth date:</label>
            <div className="input-container">
              <input 
                className={"input"}
                placeholder="dd"
                type='text' 
                value = {date} 
                onChange={(e) => {
                  let value = e.target.value
                  console.log("value", value)
                  console.log("date", date)
                  if (value.length > 2) return
                  if (value.length > 0 && !isCharNumber(value.slice(-1))) return
                  if (value == "00") return
                  if (Number(value) > 31) return
                  setdate(value)}}
              />
              <input 
                className={"input"}
                placeholder="mm"
                type='text' 
                value = {month} 
                onChange={(e) => {
                  if (e.target.value.length > 2) return
                  if (value.length > 0 && !isCharNumber(value.slice(-1))) return
                  setmonth(e.target.value)}}
              />
              <input 
                placeholder="yyyy"
                className={"input year"}
                type='text' 
                value = {year} 
                onChange={(e) => {
                  if (e.target.value.length > 4) return
                  setyear(e.target.value)}}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal