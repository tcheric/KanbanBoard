import { useState, useEffect } from 'react'
import Board from './components/Board'
import Header from './components/Header'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [boardHeight, setBoardHeight] = useState(100)

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
    document.body.classList.remove("dark-mode-body-point");
    document.body.classList.remove("dark-mode-body");
    if (newTheme === "Black / Sand" || newTheme === "Black / Blue" ) {
      document.body.classList.add("dark-mode-body");
      if (pointing) {
        document.body.classList.add("dark-mode-body-point");
      }
    } else if (newTheme === "Blue / White" || newTheme === "Red / White" ) {
      document.body.classList.add("light-mode-body");
      if (pointing) {
        document.body.classList.add("light-mode-body-point");
      }
    }
  }
  
  // Toggle pointing useState and apply css. LocalStorage value changed in ModalContent.js
  const togglePointing = () => {
    setPointing(!pointing)
    let cssClass
    if (theme === "Black / Sand" || theme === "Black / Blue" ) {
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

  const toggleReminder = id => {
    const updatedTasks = tasks.map(item => {
      if (item.id === id) {
        (item.reminder = !item.reminder)
      }
      return item
    })
    console.log(tasks)
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

  return (
    <>
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
        <Board 
          tasks={sortTasks(0)} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
          onBackwards={moveBackwards} 
          onForward={moveForward} 
          onEdit={editTask}
          name="To-do:"
          height={boardHeight}
        />
        <Board 
          tasks={sortTasks(1)} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
          onBackwards={moveBackwards} 
          onForward={moveForward} 
          onEdit={editTask}
          name="Doing:"
          height={boardHeight}
          /> 
        <Board 
          tasks={sortTasks(2)} 
          onDelete={deleteTask} 
          onToggle={toggleReminder} 
          onBackwards={moveBackwards} 
          onForward={moveForward} 
          onEdit={editTask}
          name="Done:"
          height={boardHeight}
        />
      </div>
    </>
  );
}
// *If showAddTask is true, then <...> will execute. "short circuit evaluation"

export default App;
