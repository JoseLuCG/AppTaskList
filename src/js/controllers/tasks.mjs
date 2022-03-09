import { addTask, saveTasks, getTasks, deleteAllCompletedTasksHandler } from "../models/domainObjects.mjs";
import { taskListHTMLSelector, addTaskInputSelector, completedCSSClass, buttonDeleteAllCompletedTasks } from "../models/defines.mjs"

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

//*TODO Modificar el boton para saber cual es el que borra y el de tarea completada*/

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

//Añade el manejador de eventos para el checkbox que borra todas las tareas completadas.
document.querySelector(buttonDeleteAllCompletedTasks).addEventListener("click", deleteAllCompletedTasksHandler);

/**
 * Comprueba los elementos del array y los muestra en pantalla. 
 * @param {*} CSSselector - Seria un ul
 * @param {*} tasksArray - El array de tareas.
 */
export function updateTasksHTML (CSSselector, tasksArray) {
    const listHTMLElement = document.querySelector(CSSselector);
    listHTMLElement.innerText = "";
    if (tasksArray.length > 0) {
        for ( let index in tasksArray ) {
            listHTMLElement.appendChild(task2HTMLElement(index, tasksArray[index]));
        }
    } else {
        listHTMLElement.innerText = "Add your first task..."
    }
    //orderCompletedTask (listHTMLElement)
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

/**
 * Agrupa las tareas completadas a final de la lista.
 *  @param {object} ul Es el ul de HTML.
 *  @param {object} li Son todos los li de ul en HTML.
 */
 function orderCompletedTask (list) {

    const ul = document.querySelector("ul");
    const li = document.querySelectorAll(".completed");
    console.log(ul, li);

    for (let idx = 0; idx < li.length; idx++) {
        const checkbox = li[idx];
        console.log(checkbox);
        ul.appendChild(checkbox);
    }
};
