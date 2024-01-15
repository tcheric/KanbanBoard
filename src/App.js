import { useState, useEffect } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import AddTask from './components/AddTask'
import { DndContext, useSensor, useSensors, KeyboardSensor, PointerSensor, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [boardHeight, setBoardHeight] = useState(100)
  const [isDropped, setIsDropped] = useState(false)
  const boardsIds = [0, 1, 2]

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

  const sortTasks =  board => { 
    if (tasks == null) {
      return []
    } else {
      const sortedTasks = tasks.filter(item => item.board === board)
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

  const moveToBoard = (taskId, boardId) => {  
    const updatedTasks = tasks.map(item => {
      if (item.id === taskId) (item.board = boardId)
      return item
    })
    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    updateTasks()
  }

  const handleDragEnd = event => {  
    console.log(event)
    const {active, over} = event

    if (over.data.current.type === "Task") {
      console.log("Dropped on task")
      if (getTask(over.id).board === getTask(active.id).board) {
        console.log("It's the same board")
      } else {
        console.log("It's another board")
      }
    } else if (over.data.current.type === "Board") {
      console.log("Dropped on board")
      setIsDropped(true)
      moveToBoard(active.id, event.over.id)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6
      },
    }),
  )

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
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
          // <SortableContext key={id} items={sortTasks(id)} strategy={verticalListSortingStrategy}>
          <Board 
            key={id} 
            id={id}
            tasks={sortTasks(id)} 
            // tasks={tasksByBoard[id]} 
            onDelete={deleteTask} 
            onToggle={toggleReminder} 
            onBackwards={moveBackwards} 
            onForward={moveForward} 
            onEdit={editTask}
            height={boardHeight}
          />
          // </SortableContext>
        ))}
      </div>
    </DndContext>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
