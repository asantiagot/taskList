// Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);

    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
    
}

// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content'
    e.preventDefault();

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Tasks from Local Storage
function getTasksFromLocalStorage() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');

        // Add class
        li.className = 'collection-item';

        // Create text node and append to li
        li.appendChild(document.createTextNode(task));

        // Create new link element
        const link = document.createElement('a');

        // Add class
        link.className = 'delete-item secondary-content'

        // Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        
        // Append the link to li
        li.appendChild(link);

        // Append li to ul
        taskList.appendChild(li);
    })
}

// Remove Task
function removeTask(e) {
    if (e.target.className === 'fa fa-remove') {
        e.target.parentElement.parentElement.remove();

        let localStorageTasks;

        if (localStorage.getItem('tasks') === null) {
            localStorageTasks = []
        } else {
            localStorageTasks = JSON.parse(localStorage.getItem('tasks'));
        }

        localStorageTasks.forEach(function (task, index) {
            if (e.target.parentElement.parentElement.textContent === task) {
                localStorageTasks.splice(index, 1);
            }
        })

        localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
    }
}

// Clear tasks
function clearTasks(e) {
    taskList.innerHTML = '';

    // localStorage.setItem('tasks', JSON.stringify("[]"));
    localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    // tip: querySelectorAll returns a node list, whereas getElementByClassName returns an HTML collection that has to be converted to an array
    // this way we can use forEach 
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item = task.firstChild.textContent;
        console.log(item.indexOf(text));
        if(item.toLowerCase().indexOf(text) == -1) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
}

