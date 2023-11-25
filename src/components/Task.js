import { useState } from "react"
import { FiCheck, FiChevronLeft, FiChevronRight, FiX, FiMoreHorizontal } from "react-icons/fi"
import { useDraggable } from '@dnd-kit/core'
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

const Task = ({ task, onDelete, onToggle, onBackwards, onForward, onEdit, darkMode}) => {
  const [showEditField, setShowEditField] = useState(false)
  const [newName, setNewName] = useState("")

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

  const {
    attributes: draggableAttributes, 
    listeners: draggableListeners, 
    setNodeRef: draggableSetNodeRef , 
    transform: draggableTransform} = useDraggable({
    id: task.id.toString(),
  })
  
  const {
    attributes: sortableAttributes, 
    listeners: sortableListeners, 
    setNodeRef: sortableSetNodeRef , 
    transform: sortableTransform,
    transition} = useSortable({
    id: task.id.toString(),
  })

  const style = {
    transform: CSS.Translate.toString(draggableTransform),
    transition,
  }
  
  const setNodeRef = node => {
    sortableSetNodeRef(node);
    draggableSetNodeRef(node);
  }

  return (
    // <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
    <div 
      ref={setNodeRef} 
      style={style}
      {...sortableAttributes}
      {...sortableListeners}
      {...draggableAttributes}
      {...draggableListeners}>
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
}

export default Task