import { addTask, saveTasks, getTasks } from "../models/domainObjects.mjs";
import { taskListHTMLSelector, addTaskInputSelector, completedCSSClass } from "../models/defines.mjs"

export function task2HTMLElement (taskIndex, taskObject) {
    // Creo los elementos HTML
    const listHTMLItem = document.createElement("li");
    const pHTMLItem = document.createElement("p");
    const inputCheckboxHTMLItem = document.createElement("input");
    const inputCheckboxDeleteHTMLItem = document.createElement("input");
    // Les proporciono valores 
    inputCheckboxHTMLItem.type = "checkbox";
    inputCheckboxDeleteHTMLItem.type="checkbox";
    inputCheckboxHTMLItem.checked = taskObject.completed;
    pHTMLItem.innerHTML = taskObject.taskName
    // Los anido
    listHTMLItem.append(pHTMLItem, inputCheckboxHTMLItem);
    listHTMLItem.append(pHTMLItem, inputCheckboxDeleteHTMLItem);
    // Aplico estilos si está completada
    if (taskObject.completed) {
        listHTMLItem.classList.add(completedCSSClass);
    } else {
        listHTMLItem.classList.remove(completedCSSClass);
    }
    // Añado el manejador de eventos para el checkbox que selecciona(el primero)
    inputCheckboxHTMLItem.addEventListener(
        "click",
        (event) => {
            const tasks = getTasks();
            tasks[taskIndex].completed = event.target.checked;
            saveTasks(tasks);
        }
    );

    // Añado el manejador de eventos para el checkbox que borra la tarea(el segundo)
    // Este checkbox borra el elemento del array de tareas y del HTML
    inputCheckboxDeleteHTMLItem.addEventListener(
        "click",
        (event) => {
            //obtengo el array de tareas del LocalStorage
            const tasks = getTasks();
            //si la posición (index) está en el rango array, borra el objeto del 
            //array en esa posición
            if ( taskIndex >-1 && taskIndex<=tasks.length) 
                tasks.splice( taskIndex, 1 );
            //actualiza el HTML y el localStorage con el array de tareas ya modificado
            saveTasks(tasks);
        }
    );

    return listHTMLItem
}

export function updateTasksHTML (CSSselector, tasksArray) {
    const listHTMLElement = document.querySelector(CSSselector);
    listHTMLElement.innerText = ""
    if (tasksArray.length > 0) {
        for ( let index in tasksArray ) {
            listHTMLElement.appendChild(task2HTMLElement(index, tasksArray[index]))
        }
    } else {
        listHTMLElement.innerText = "Add your first task..."
    }

}

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
