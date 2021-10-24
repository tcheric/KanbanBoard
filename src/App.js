import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'

const App = () => {
  const [tasks, setTask] = useState([
    {
      id: 1,
      name: 'shopping',
      reminder: false,
    },
    {
      id: 2,
      name: 'lunch',
      reminder: false,
    },
  ])

  const deleteTask = (id) => {
    setTask(tasks.filter((tasks) => tasks.id !== id))
  }

  const toggleReminder = (id) => {
    setTask(tasks.map((task) => (
      task.id === id 
      ? {...task, reminder: !task.reminder} 
      : task
    )))
  }

  return (
    <div className="container">
      <Header />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>
      ) : (
        'No tasks'
      )}
    </div>
  );
}

export default App;
