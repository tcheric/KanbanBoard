import { forwardRef, useState, useRef } from "react"
import { FiCheck, FiChevronLeft, FiChevronRight, FiX, FiMoreHorizontal } from "react-icons/fi";
import { Draggable } from '@hello-pangea/dnd';

const Task = forwardRef(({ task, onDelete, onToggle, onBackwards, onForward, onEdit, darkMode, provided, innerRef}, ref) => {
  const [showEditField, setShowEditField] = useState(false)
  const [newName, setNewName] = useState("")


  const setRef = (refValue) => {
    ref.current = refValue
    innerRef(refValue)
  }

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
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={setRef(this)}
    >
      <div 
        className={`task ${task.reminder ? 'reminder' : ''}`} 
        onDoubleClick={() => onToggle(task.id)}
      >
        <div className="task-left">
          <h3>
            {!showEditField && <p>{task.name}</p>}
            {showEditField && <input 
              type='text' 
              placeholder={task.name}
              value = {newName} 
              onChange={(e) => setNewName(e.target.value)}
              />}
          </h3>
          <h5>{task.day}</h5>
        </div>
        <div className="task-buttons">
          {!showEditField && <FiMoreHorizontal onClick={() => taskEdit(task.id)}/>}
          {showEditField && <FiCheck onClick={() => taskEditSubmit(task.id)}/>}
          <FiChevronLeft onClick={() => onBackwards(task.id)}/>
          <FiChevronRight onClick={() => onForward(task.id)}/>
          <FiX onClick={() => onDelete(task.id)}/>
        </div>
      </div>
    </div>
  )
})

export default Task
