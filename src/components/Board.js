import React, { useMemo, useState } from 'react'
import Task from './Task'
import {useDroppable} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ErrorBoundary } from "react-error-boundary"

const Board = ({ id, tasks, onDelete, onToggle, onBackwards, onForward, onEdit, height }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
      data: {
        type:"Board"
      }
  })

  const [boardTasks, setBoardTasks] = useState(() => {
    return tasks
  })

  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const names = ["To-do:", "Doing:", "Done:"]


  const printBT = () => {
    console.log(boardTasks)
  }

  const logError = (error, info) => {
    // Do something with the error, e.g. log to an external API
    console.log(error, info)
  };

  // Working on implementing board move case
  return (
      <div className="flex-child" style={{height: `${height}`}} ref={setNodeRef}>
        <div className="board">
          <h2><u>{names[id]}</u></h2>
          <ErrorBoundary fallback={<div>Something went wrong</div>} onError={logError}>
            {tasks.length > 0 ? 
              <SortableContext key={id} items={boardTasks}>
                {tasks.map((task) => (
                  <Task 
                    key={task.sortableId}
                    task={task}
                    onBackwards={onBackwards} 
                    onForward={printBT} 
                    onDelete={onDelete} 
                    onToggle={onToggle}
                    onEdit={onEdit}
                    dragOverlay={false}
                  />
                ))}
              </SortableContext>
              : (
                <span>- No tasks -</span>
              )
            }
          </ErrorBoundary>
        </div>
      </div>
  )
}

export default Board
