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



  // Get last sortableId


  // tasks prop will always be sorted. 
  // input tasks which may have sortableIds or not, will 
  const setSortableIds = ( tasks ) => {
    // Check if task.sortableIds is set on all tasks in tasks array
    let allTasksHaveSortableId = true
    for (const task of tasks) {
      let hasSortableId = 'sortableId' in task
      if (!hasSortableId) allTasksHaveSortableId = false 
    }

    let sorted = true
    // Check if tasks are already sorted
    for (let i = 0; i < tasks.length - 1; i++) {
      if (tasks[i].id > tasks[i+1].id) {
        sorted = false
        break
      }
    }
    // If not sorted, sort
    if (!allTasksHaveSortableId && !sorted) {

    }

    // If sorted already, just apply sortableIds to each task

  }

  // For dragging a task into a board
  const adjustSortableIds = () => {

  }

  const names = ["To-do:", "Doing:", "Done:"]

  const printBT = () => {
    console.log(boardTasks)
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
