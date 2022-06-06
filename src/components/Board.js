import React from 'react'
// import { createRef, useState, useEffect } from "react"
// import { useCallback } from "react/cjs/react.production.min"
import Task from './Task'

const Board = ({ tasks, onDelete, onToggle, onBackwards, onForward, darkMode, onEdit, name, height }) => {
  
  return (
    <div className="flex-child" style={{height: `${height}`}}>
      <div className="board">
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
              onEdit={onEdit}
              darkMode={darkMode}>
            </Task>
          ))
        ) : (
          <span>- No tasks -</span>
        )}
      </div>
    </div>
  )
}

export default Board
