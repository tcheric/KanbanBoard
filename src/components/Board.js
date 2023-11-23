import React from 'react'
import Task from './Task'
import {useDroppable} from '@dnd-kit/core';

const Board = ({ id, tasks, onDelete, onToggle, onBackwards, onForward, darkMode, onEdit, height }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id
  })
  const names = ["To-do:", "Doing:", "Done:"]

  return (
    <div className="flex-child" style={{height: `${height}`}} ref={setNodeRef}>
      <div className="board">
        <h2><u>{names[id]}</u></h2>
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
