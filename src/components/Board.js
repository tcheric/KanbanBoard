import React from 'react'
import Task from './Task'
import { Draggable } from '@hello-pangea/dnd';


const Board = ({ tasks, onDelete, onToggle, onBackwards, onForward, darkMode, onEdit, name, height }) => {
  
  return (
    <div className="flex-child" style={{height: `${height}`}}>
      <div className="board">
        <h2><u>{name}</u></h2>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <Draggable draggableId={task.id.toString()} index={index} key={task.id} >
              {provided => (
                <Task 
                  task={task}
                  onBackwards={onBackwards} 
                  onForward={onForward} 
                  onDelete={onDelete} 
                  onToggle={onToggle}
                  onEdit={onEdit}
                  darkMode={darkMode}
                  provided={provided}
                  innerRef={provided.innerRef}>
                </Task>
              )}
            </Draggable>
          ))
        ) : (
          <span>- No tasks -</span>
        )}
      </div>
    </div>
  )
}

export default Board
