import { useState } from "react"

const Modal = ({ open, onClose }) => {

  if (!open) return null

  const [dob, setDob] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    if (!dob) {
      alert('Please enter a date')
      return
    }
    onAdd({ dob }) //this is an addTask object
    setDob('')
  }

  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
          <form className="dob-form" onSubmit={onSubmit}>
            <label className="label">Enter DOB:</label>
            <input 
              className={"input"}
              type='date' 
              value = {dob} 
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default Modal