import { useState } from "react"

const Modal = ({ open, onClose }) => {

  if (!open) return null

  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
        </div>
      </div>
    </>
  )
}

export default Modal