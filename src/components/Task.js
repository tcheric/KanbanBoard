import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}` } 
      onDoubleClick={() => onToggle(task.id)}>
      <h3>
        {task.name} 
        <FaTimes 
          style={{cursor:'pointer'}}
          onClick={() => onDelete(task.id)} 
        />
      </h3>
      <h5> {task.day} </h5>
    </div>
  )
}

export default Task
