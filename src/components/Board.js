import React, { useMemo, useState } from 'react'
import Task from './Task'
import {useDroppable} from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';

const Board = ({ id, tasks, onDelete, onToggle, onBackwards, onForward, darkMode, onEdit, height }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
      data: {
        type:"Board"
      }
  })
  const names = ["To-do:", "Doing:", "Done:"]
  const taskIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])
  const boardTasks = useState(() => {
    return tasks
  })

  const printBT = () => {
    console.log(boardTasks[0])
  }

  // Issue right now: drag animation not working, cannot reorder within same list, code very obfuscated
  // Within p2dnd, have implemented base functionality, need to fix buggy task/board mvmt behaviour and we good
  // Working on implementing dragOverlay and board move case
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
                    onDelete={onDelete} 
                    onToggle={onToggle}
                    onEdit={onEdit}
                    darkMode={darkMode}
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
