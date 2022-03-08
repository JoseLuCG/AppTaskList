import { taskListHTMLSelector } from "./defines.mjs";
import { updateTasksHTML } from "../controllers/tasks.mjs";

export const tasksStorageKey = "tasks"

/**
 * Toma el valor guardado en la StorageKey(en este caso "tasks") y los transforma en datos.
 * @returns {array} - Array con los objetos de las tareas.
 */
export function getTasks () {
    const stringData = localStorage.getItem(tasksStorageKey) || "[]";
    return JSON.parse(stringData);
}

/**
 * Mete una tarea dentro del array.
 * @param {object} taskObject - Objeto a añadir a tarea.
 */
export function addTask(taskObject) {
    const tasks = getTasks();
    tasks.push(taskObject);
    saveTasks(tasks);
}

/**
 * Cambia los datos a tipo "string", para poder guardarlos
 * en LocalStorage.
 * @param {Array} newTasksArray Array a transformar en string para guardar en LocalStorage.
 */
export function saveTasks(newTasksArray) {
    const stringData = JSON.stringify(newTasksArray)
    localStorage.setItem(tasksStorageKey, stringData);
    updateTasksHTML(taskListHTMLSelector, newTasksArray)
}

/**
 * Borra un elemento del array de tareas y del HTML
 * @param {number} index 
 */
export function deleteTask(index){
    //obtengo el array de tareas
    const tasks = getTasks();
    //si la posición (index) existe en el array, borra el objeto del array en esa posición
    if ( index >-1 && index<=tasks.length) 
        tasks.splice( index, 1 );
    //actualiza el HTML y el localStorage con el array de tareas ya modificado
    savetasks(tasks);


}