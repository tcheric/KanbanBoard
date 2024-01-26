import React, { useMemo, useState } from 'react'
import Task from './Task'
import {useDroppable} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

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

  // Working on implementing board move case
  return (
      <div className="flex-child" style={{height: `${height}`}} ref={setNodeRef}>
        <div className="board">
          <h2><u>{names[id]}</u></h2>
            {tasks.length > 0 ? 
              <SortableContext key={id} items={boardTasks}>
                {tasks.map((task) => (
                  <Task 
                    key={task.id}
                    task={task}
                    onBackwards={onBackwards} 
                    onForward={onForward} 
                    onDelete={printBT} 
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
        </div>
      </div>
  )
}

export default Board
