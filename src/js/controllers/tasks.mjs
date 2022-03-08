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
    orderCompletedTask (listHTMLElement)
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
 * Esta funcion sirve para agrupar las tareas completadas a final de la lista.
 *  @param {}
 */
 function orderCompletedTask (list) {

    const arrayTasksList = Array.from(list.children)

    arrayTasksList.forEach(li => {
        console.log(list.children[idx].children[1])
    });

}

//orderCompletedTask()