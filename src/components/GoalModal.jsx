import { useState } from "react"
import { FaTimes } from "react-icons/fa";
import { GoCheck } from "react-icons/go"

const GoalModal = ({ name, open, onClose, finishGoal, clearGoal, renameGoal }) => {

  if (!open) return null

  const [whichBC, setWhichBC] = useState(1)
  const [newName, setNewName] = useState("")

  const renameGoalCurrState = () => {
    const newNameCopy = newName
    renameGoal(newNameCopy, name)
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
          <div className="gm-content">
            <div className="goal-info">{name}</div>

            {(whichBC == 1) && <div className="gm-btn-ctnr">
              <button className="gm-btn" onClick={()=>setWhichBC(2)}>
                Finish goal</button>
              <button className="gm-btn" onClick={()=>setWhichBC(4)}>
                Rename goal</button>
              <button className="gm-btn" onClick={()=>setWhichBC(3)}>
                Clear goal data</button>
            </div>}

            {(whichBC == 2) && <div className="gm-btn-ctnr">
              <button className="gm-btn" onClick={()=>finishGoal(name, "Success")}>
                Success</button>
              <button className="gm-btn" onClick={()=>finishGoal(name, "Failure")}>
                Failure</button>
              <button className="gm-btn" onClick={()=>setWhichBC(1)}>
                Cancel</button>
            </div>}

            {(whichBC == 3) && <div className="gm-btn-ctnr">
              <span>Are you sure?</span>
              <button className="gm-btn" onClick={()=>clearGoal(name)}>
                Yes</button>
              <button className="gm-btn" onClick={()=>setWhichBC(1)}>
                No</button>
            </div>}

            {(whichBC == 4) && <div className="gm-btn-ctnr-wide">
              <span>Rename:</span>
                <div className="ag-input-ctnr">
                <input 
                  id={"ag-input"}
                  type='text' 
                  spellCheck="false"
                  autoComplete="off" 
                  placeholder={"New Goal Name"}
                  value = {newName} 
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.code == "Enter") renameGoalCurrState()
                  }}
                />
                <button 
                  className="add-goal-button"
                  onClick={() => {setWhichBC(1)}}>
                  X
                </button>
                <button 
                  className="add-goal-button"
                  onClick={()=>renameGoalCurrState()}>
                  <GoCheck className="tick-button"/>
                </button>
              </div>
            </div>}

            <div className="goal-analytics"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GoalModal