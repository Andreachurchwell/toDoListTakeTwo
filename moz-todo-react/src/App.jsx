import { useState } from 'react'
import Form from './components/Form'
// import './components/FilterButton'
import Todo from './components/Todo'
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid'


const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);


function App(props) {



  const [filter, setFilter] = useState('All')


  function addTask(name) {


    const newTask = { id: `todo-${nanoid()}`, name, completed: false };

    setTasks([...tasks, newTask])

  }

  function toggleTaskCompleted(id) {

    // console.log('tasks[0]', tasks[0])
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
      }
      return task
    })
    setTasks(updatedTasks)
  }


  function deleteTask(id) {
    // console.log(id)
    const remainingTasks = tasks.filter((task) => id !== task.id)
    setTasks(remainingTasks)
  }







  function editTask(id, newName) {
    const editedTaskList = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName }
      }
      return task
    })
    setTasks(editedTaskList)
  }





  const [tasks, setTasks] = useState(props.tasks)



  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />))


  const tasksNoun = taskList.length !== 1 ? "tasks" : "task";


  const headingText = `${taskList.length} ${tasksNoun} remaining`;


  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));



  return (

    <div className="todoapp stack-large">

      <h1>ToDoTakeTwo</h1>


      <Form addTask={addTask} />



      <div className="filters btn-group stack-exception">

        {filterList}

        {/* filterList replaced these below */}
        {/* <FilterButton />
              <FilterButton />
              <FilterButton /> */}

      </div>

      <h2 id='list-heading'>{headingText}</h2>






      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
        {taskList}

        {/* <Todo name='Eat' completed />
        <Todo name='Sleep' id='todo-1' />
        <Todo name='Repeat' id='todo-2' /> */}


      </ul>
    </div>
  );
}



export default App;







