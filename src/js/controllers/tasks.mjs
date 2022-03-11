import { addTask, saveTasks, getTasks, deleteAllCompletedTasksHandler } from "../models/domainObjects.mjs";
import { disappear, SearchTaskTextSelector, taskListHTMLSelector, addTaskInputSelector, completedCSSClass, buttonDeleteAllCompletedTasks, SearchTaskButtonSelector } from "../models/defines.mjs"

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
    const buttonUno=document.querySelector("#buttonUno");
    buttonUno.addEventListener("click",hideHandler);
    

    const buttonEditHTMLItem = document.createElement("button");
    // Les proporciono valores 
    inputCheckboxHTMLItem.type = "checkbox";
    inputCheckboxDeleteHTMLItem.type="checkbox";
    buttonEditHTMLItem.type = "button";
    buttonEditHTMLItem.addEventListener("click", editTasks) //SIN COMPLETAR
    buttonEditHTMLItem.innerText = "Editar";
    inputCheckboxHTMLItem.checked = taskObject.completed;
    pHTMLItem.innerHTML = taskObject.taskName;
    // Los anido
    listHTMLItem.append(inputCheckboxHTMLItem, pHTMLItem, inputCheckboxDeleteHTMLItem);
    // Aplico estilos si está completada
    if (taskObject.completed) {
        listHTMLItem.classList.add(completedCSSClass);
    
    } else {
        listHTMLItem.classList.remove(completedCSSClass);
        listHTMLItem.append(buttonEditHTMLItem);
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
 * Manejador del evento del click del boton ver/ocultar 
 * tareas completadas 
 * @param {undefined} event - Objeto con las propiedades del evento 
 */
function hideHandler(event){
    event.preventDefault();
    const completedElements = document.querySelectorAll(".completed");
    for (let item of completedElements)
        item.classList.toggle("visibilidad");

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
    orderCompletedTask (listHTMLElement)
}

/**
 * Añade un nuevo objeto al array de tareas.
 * @param {*} event 
 */
export function taskAddButtonClickHandler (event) {
    const input = document.querySelector(addTaskInputSelector);
    event.preventDefault();
    const newTask = {
        taskName: input.value,
        completed: false,
    };
    if (input.value!=""){
        addTask(newTask);
        updateTasksHTML(taskListHTMLSelector,getTasks());
        input.value="";
    }else {
        window.alert("Añade una descripción a la tarea antes de continuar");
    }
}

/**
 * Agrupa las tareas completadas a final de la lista.
 *  @param {object} ul Es el ul de HTML.
 *  @param {object} li Son todos los li de ul en HTML.
 */
 function orderCompletedTask (event) {

    const ul = document.querySelector("ul");
    const li = document.querySelectorAll(".completed");
    //console.log(ul, li);

    for (let idx = 0; idx < li.length; idx++) {
        const checkbox = li[idx];
        //console.log(checkbox);
        ul.appendChild(checkbox);
    }
};

/**
 * Manejador del evento del click del boton de buscar tareas
 * @param {undefined} event 
 */
export function SearchTaskButtonClickHandler(event){
    const tasks = getTasks();
    let expresionABuscar = document.querySelector(SearchTaskTextSelector).value
    console.log("la expresion a buscar es: " + expresionABuscar)
    const resultado=tasks.forEach(element => {
    element.taskName.match(expresionABuscar);
    
    });
    console.log(resultado);
    
}

/**
 * Modifica el texto de la tarea.
 * @param {*} params 
 */
/*
function editTasks (event) {
    const cajaParaEditar = document.querySelector("#taskInput");
    const p = event.target.parentNode.querySelector("p")
    let tareaeditable = p.innerText;

    console.log(tareaeditable);
    console.log(cajaParaEditar);

    cajaParaEditar.value = tareaeditable;

}
*/
