import { useState, useEffect } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import AddTask from './components/AddTask'
import { DndContext, useSensor, useSensors, KeyboardSensor, PointerSensor, closestCenter, DragOverlay } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from "./components/Task"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [boardHeight, setBoardHeight] = useState(100)
  const boardsIds = [0, 1, 2]
  const [activeTask, setActiveTask] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    if (tasksFromLocal == null) {
      return []
    } else {
      return tasksFromLocal
    }
  })

  const [pointing, setPointing] = useState(() => {
    const pointingFromLS = JSON.parse(localStorage.getItem("pointing"))
    if (pointingFromLS === "" || pointingFromLS === null) {
      localStorage.setItem("pointing", "true")
      return true
    } else {
      return pointingFromLS
    }
  })

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme")
  })

  const sortTasksv2 = () => {
    let arr = [[], [], []]
    for (const t of tasks){
      // t.board is boardID, ie. 0, 1, 2, 999(backlog)
      if (t.board === 0) {
        arr[0].push(t)
      } else if (t.board === 1) {
        arr[1].push(t)
      }  else if (t.board === 2) {
        arr[2].push(t)
      } 
    } 
    return arr 
  }

  const [tasksByBoard, setTasksByBoard] = useState(sortTasksv2)

  useEffect(() => {
    const themeFromLS = localStorage.getItem("theme")
    if (themeFromLS === "" || themeFromLS === null) {
      changeTheme("Red / White")
    } else {
      changeTheme(themeFromLS)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Matches boards height
  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      let currMaxHeight = 0
      for (let entry of entries) {
        if (entry.contentRect.height > currMaxHeight) {
          currMaxHeight = entry.contentRect.height
        }
      }
      setBoardHeight(currMaxHeight)
    })
    const boardElemList = document.querySelectorAll(".board")
    resizeObserver.observe(boardElemList[0])
    resizeObserver.observe(boardElemList[1])
    resizeObserver.observe(boardElemList[2])
  }, [])

  const updateTasks = () => {
    const stringTasks = localStorage.getItem("tasks")
    const tasksFromLocal = JSON.parse(stringTasks)
    setTasks(tasksFromLocal)
    // setTasksByBoard()
  }

  const changeTheme = newTheme => {
    // Change elements color
    if (newTheme === "null") {
      localStorage.setItem("theme", "Red / White")
      changeTheme("Red / White")
      return
    }
    document.documentElement.setAttribute("data-theme", newTheme)
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme) 

    // Change background color and background image
    document.body.classList.remove("light-mode-body-point");
    document.body.classList.remove("light-mode-body");
    document.body.classList.remove("black-mode-body-point");
    document.body.classList.remove("black-mode-body");
    document.body.classList.remove("dark-mode-body-point");
    document.body.classList.remove("dark-mode-body");
    if (newTheme === "Black / Sand" || newTheme === "Black / Blue" ) {
      document.body.classList.add("black-mode-body");
      if (pointing) {
        document.body.classList.add("black-mode-body-point");
      }
    } else if (newTheme === "Blue / White" || newTheme === "Red / White" ) {
      document.body.classList.add("light-mode-body");
      if (pointing) {
        document.body.classList.add("light-mode-body-point");
      }
    } else if (newTheme === "Dark / Red" ) {
      document.body.classList.add("dark-mode-body");
      if (pointing) {
        document.body.classList.add("dark-mode-body-point");
      }
    }
  }
  
  // Toggle pointing useState and apply css. LocalStorage value changed in ModalContent.js
  const togglePointing = () => {
    setPointing(!pointing)
    let cssClass
    if (theme === "Black / Sand" || theme === "Black / Blue" ) {
      cssClass = "black-mode-body-point"
    } else if (theme === "Dark / Red") {
      cssClass = "dark-mode-body-point"
    } else {
      cssClass = "light-mode-body-point"
    }
    pointing 
      ? document.body.classList.remove(cssClass) 
      : document.body.classList.add(cssClass)
  }
    
  const toggleAddTask = () => {
    setShowAddTask(!showAddTask)
  }  
  
  const addTask = newTask => {
    const newTaskInArray = (tasks == null) ? [newTask] : [...tasks, newTask]
    localStorage.setItem("tasks", JSON.stringify(newTaskInArray))
    updateTasks()
  }

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        item.name = newName
      }
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const deleteTask = id => {
    const updatedTasks = tasks.filter(item => item.id !== id)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const getTask = id => {
    return tasks.find((item) => item.id === id)
  }


  const toggleReminder = id => {
    const updatedTasks = tasks.map(item => {
      if (item.id === id) {
        (item.reminder = !item.reminder)
      }
      return item
    })
    // console.log(tasks)
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const sortTasks = id => { 
    if (tasks == null) {
      return []
    } else {
      const sortedTasks = tasks.filter(item => item.board === id)
      return sortedTasks
    }
  }

  const moveBackwards = id => { 
    const updatedTasks = tasks.map(item => {
      if (item.id === id && item.board > 0) (item.board--)
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const moveForward = id => {  
    const updatedTasks = tasks.map(item => {
      if (item.id === id && item.board < 2) (item.board++)
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const moveToBoard = (taskId, board) => {  
    const updatedTasks = tasks.map(item => {
      if (item.id === taskId) (item.board = board)
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  // Drag handler functions
  const handleDragStart = ( event ) => {
    if (event.active.data.current?.type === "Column") {
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  const handleDragEnd = ( event ) => {
    // console.log(tasks)
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const overIsTask = over.data.current?.type === "Task";
    const isOverABoard = over.data.current?.type === "Board";

    // Im dropping a Task over another Task
    if (overIsTask) {
      // This setstate func is called twice, doesn't matter as drag event already ended by 2nd call
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        // Different board
        if (tasks[activeIndex].board != tasks[overIndex].board) {
          tasks[activeIndex].board = tasks[overIndex].board;
          return arrayMove(tasks, activeIndex, overIndex);
        }
        // Same board
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // Im dropping a Task over a Board
    if (isOverABoard) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].board = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }

    return
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      },
    }),
  )

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors} >
      <div className="header-container">
        <Header 
          toggleAddTask={toggleAddTask} 
          showAdd={showAddTask} 
          changeTheme={changeTheme}
          togglePointing={togglePointing}
          pointing={pointing}
        />
        {showAddTask && <AddTask onAdd={addTask} tasks={tasks} darkMode={theme}/>}
      </div>
      <div className="board-container">
        {boardsIds.map((id) => (
          <Board 
            key={id} 
            id={id}
            tasks={sortTasks(id)} 
            onDelete={deleteTask} 
            onToggle={toggleReminder} 
            onBackwards={moveBackwards} 
            onForward={moveForward} 
            onEdit={editTask}
            height={boardHeight}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTask ? (
          <Task
            task={activeTask}
            dragOverlay={true}
          />
        ): null}
      </DragOverlay>
    </DndContext>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
