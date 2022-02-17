import React from 'react'
import Task from './Task'

const Board = ({ tasks, onDelete, onToggle, onBackwards, onForward, darkMode, name }) => {
  
  return (
    <div className="float-child">
      {/* <div className={darkMode ? "dark-mode-boards" : "light-mode-boards"}> */}
        <div className={`boards ${darkMode ? "dark" : "light"}`}>
          <h2><u>{name}</u></h2>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task 
                key={task.id} 
                task={task} 
                onBackwards={onBackwards} 
                onForward={onForward} 
                onDelete={onDelete} 
                onToggle={onToggle}
                darkMode={darkMode}>
              </Task>
            ))
          ) : (
            'No tasks'
          )}
        </div>
      {/* </div> */}
    </div>
  )
}

export default Board
