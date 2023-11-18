import React from 'react'
import Task from './Task'
import {useDroppable} from '@dnd-kit/core';

const Board = ({ tasks, onDelete, onToggle, onBackwards, onForward, darkMode, onEdit, name, height }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  })

  return (
    <div className="flex-child" style={{height: `${height}`}} ref={setNodeRef}>
      <div className="board">
        <h2><u>{name}</u></h2>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Task 
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
