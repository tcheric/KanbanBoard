// import { FaTimes } from 'react-icons/fa'
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

const Task = ({ task, onDelete, onToggle, onBackwards, onForward, darkMode}) => {
  return (
    <div 
      className={`task ${task.reminder ? 'reminder' : ''} ${darkMode ? "dark" : "light"}` } 
      onDoubleClick={() => onToggle(task.id)}
    >
      {/* <div className={darkMode ? "dark-mode-tasks" : "light-mode-tasks"}> */}
        <h3>
          {task.name}
          <div style={{minWidth:"60px"}}>
            <FiChevronLeft onClick={() => onBackwards(task.id)}/>
            <FiChevronRight onClick={() => onForward(task.id)}/>
            <FiX onClick={() => onDelete(task.id)}/>
          </div>
        </h3>
        <h5> {task.day} </h5>
      {/* </div> */}
    </div>
  )
}

export default Task
