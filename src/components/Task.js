import { useState } from "react"
import { FiCheck, FiChevronLeft, FiChevronRight, FiX, FiMoreHorizontal } from "react-icons/fi";

const Task = ({ task, onDelete, onToggle, onBackwards, onForward, onEdit, darkMode}) => {
  const [showEditField, setShowEditField] = useState(false)
  const [newName, setNewName] = useState("")
  const [newTime, setNewTime] = useState("")

  const taskEdit = () => {
    setShowEditField(true)
  }

  const taskEditSubmit = ( id ) => {
    setShowEditField(false)
    if (newName !== "") {
      onEdit(id, newName)
    }
    setNewName("")
  }

  return (
    <div 
      className={`task ${task.reminder ? 'reminder' : ''} ${darkMode ? "dark" : "light"}` } 
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {!showEditField && <p>{task.name}</p>}
        {showEditField && <input 
          type='text' 
          placeholder={task.name}
          value = {newName} 
          onChange={(e) => setNewName(e.target.value)}
          />}
        <div style={{minWidth:"80px"}}>
          {!showEditField && <FiMoreHorizontal onClick={() => taskEdit(task.id)}/>}
          {showEditField && <FiCheck onClick={() => taskEditSubmit(task.id)}/>}
          <FiChevronLeft onClick={() => onBackwards(task.id)}/>
          <FiChevronRight onClick={() => onForward(task.id)}/>
          <FiX onClick={() => onDelete(task.id)}/>
        </div>
      </h3>
      <h5>{task.day}</h5>
    </div>
  )
}

export default Task
