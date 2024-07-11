import { useState } from "react"
import { FaTimes } from "react-icons/fa";

const GoalModal = ({ name, open, onClose, finishGoal }) => {

  if (!open) return null

  const [whichBC, setWhichBC] = useState(1)


  return (
    <>
      <div className="modal-bg" onClick={onClose}>
        <div className="popup" onClick={(e)=> {e.stopPropagation()}}>
          <button 
            className="modal-close" 
            onClick={onClose}>
            {<FaTimes />}
          </button>
          <div className="gm-content">
            <div className="goal-info">{name}</div>

            {(whichBC == 1) && <div className="gm-btn-ctnr">
              <button className="gm-btn" onClick={()=>setWhichBC(2)}>
                Finish goal</button>
              <button className="gm-btn">Rename goal</button>
              <button className="gm-btn" onClick={()=>setWhichBC(3)}>
                Clear goal data</button>
            </div>}

            {(whichBC == 2) && <div className="gm-btn-ctnr">
              <button className="gm-btn" onClick={finishGoal("Success")}>
                Success</button>
              <button className="gm-btn" onClick={finishGoal("Failure")}>
                Failure</button>
              <button className="gm-btn" onClick={()=>setWhichBC(1)}>
                Cancel</button>
            </div>}

            {(whichBC == 3) && <div className="gm-btn-ctnr">
              <span>Are you sure?</span>
              <button className="gm-btn">Yes</button>
              <button className="gm-btn" onClick={()=>setWhichBC(1)}>
                No</button>
            </div>}

            <div className="goal-analytics"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GoalModal