// Code pulled substantially from WebDevSimlified (2022)
// https://github.com/WebDevSimplified/typescript-todo-list


// import module to create random id string 
import { v4 as uuidv4 } from 'uuid'

// Select the entire list
const list = document.querySelector<HTMLUListElement>("#list")
// Select the form
const form = document.getElementById("new-task-form") as HTMLFormElement
// Select the text input to the form
const input = document.querySelector<HTMLInputElement>("#new-task-title")
// Store tasks locally
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

// define type alias of a task object
type Task = {
  id: string,             
  title: string,          
  completed: boolean,     
  createdAt: Date         
  }

// Listen for the button with id "submit" to be pressed
form?.addEventListener("submit", e => {  // 'e' can be called anything
  e.preventDefault()                     // prevent refresh of page
  // if input value is not empty string or null, continue on
  if (input?.value == "" || input?.value == null) return 
  const newTask: Task = {
    id: uuidv4(),          // call module to create new random id
    title: input.value,    // title becomes text input in form
    completed: false,      // task is not completed by default
    createdAt: new Date(), // create a new date
  }
  tasks.push(newTask)      // save task to array to be put in json file
  addListItem(newTask)     // run the function to create a new newTask object
  input.value = ""         // clear text field after submitted
})

function addListItem(task: Task) {
  // create a new 'list item' element to display to the user
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")
  // when you change check box update 'completed' field in task 
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    if (task.completed == true) {
    item.style.setProperty('text-decoration', 'line-through')
    item.style.setProperty('color', 'gray')
    } else {
      item.style.setProperty('text-decoration', 'none');
      item.style.setProperty('color', 'black')
    }
    saveTasks() 
  })

  // create checkbox to indicate if task is completed
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  checkbox.style.display = "none";  // hiding the check box, personal preference
  // append checkbox and title to the list item
  label.append(checkbox, task.title)
  item.append(label)
  // add the item to the list 
  list?.append(item)
}

// save tasks in local json
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

// load tasks from local json into list
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}