import React from 'react'
import Task from './Task'

const Board = ({ tasks, onDelete, onToggle, onBackwards, onForward, name }) => {
  
  return (
    <div className="float-child">
      <div className="container">
        <h2>{name}</h2>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onBackwards={onBackwards} 
              onForward={onForward} 
              onDelete={onDelete} 
              onToggle={onToggle}>
            </Task>
          ))
        ) : (
          'No tasks'
        )}
      </div>
    </div>
  )
}

export default Board
