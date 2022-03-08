import { addTask, saveTasks, getTasks } from "../models/domainObjects.mjs";
import { taskListHTMLSelector, addTaskInputSelector, completedCSSClass } from "../models/defines.mjs"

/**
 * Transforma los datos a HTML
 * @param {*} taskIndex 
 * @param {*} taskObject 
 * @returns 
 */
export function task2HTMLElement (taskIndex, taskObject) {
    // Creo los elementos HTML
    const listHTMLItem = document.createElement("li");
    const pHTMLItem = document.createElement("p");
    const inputCheckboxHTMLItem = document.createElement("input");
    // Les proporciono valores 
    inputCheckboxHTMLItem.type = "checkbox";
    inputCheckboxHTMLItem.checked = taskObject.completed;
    pHTMLItem.innerHTML = taskObject.taskName
    // Los anido
    listHTMLItem.append(pHTMLItem, inputCheckboxHTMLItem);
    // Aplico estilos si está completada
    if (taskObject.completed) {
        listHTMLItem.classList.add(completedCSSClass);
    } else {
        listHTMLItem.classList.remove(completedCSSClass);
    }
    // Añado el manejador de eventos
    inputCheckboxHTMLItem.addEventListener(
        "click",
        (event) => {
            const tasks = getTasks();
            tasks[taskIndex].completed = event.target.checked;
            saveTasks(tasks);
        }
    );
    return listHTMLItem
}

/**
 * Comprueba los elementos del array y los muestra en pantalla. 
 * @param {*} CSSselector - Seria un ul
 * @param {*} tasksArray - El array de tareas.
 */
export function updateTasksHTML (CSSselector, tasksArray) {
    const listHTMLElement = document.querySelector(CSSselector);
    listHTMLElement.innerText = ""
    if (tasksArray.length > 0) {
        for ( let index in tasksArray ) {
            listHTMLElement.appendChild(task2HTMLElement(index, tasksArray[index]));
        }
    } else {
        listHTMLElement.innerText = "Add your first task..."
    }

}

/**
 * Añade un nuevo objeto al array de tareas.
 * @param {*} event 
 */
export function taskAddButtonClickHandler (event) {
    //console.log(event)
    const input = document.querySelector(addTaskInputSelector);
    event.preventDefault()
    const newTask = {
        taskName: input.value,
        completed: false,
    };
    addTask(newTask);
    updateTasksHTML(taskListHTMLSelector,getTasks());
}
