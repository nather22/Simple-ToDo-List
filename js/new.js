const list = document.querySelector('.list');
const form = document.querySelector('.input-group');
const input = document.querySelector('.task-input');
const allListsInput = document.querySelector('.all-lists-input');
const allLists = document.querySelector('.all-lists');
const allListsForm = document.querySelector('.all-lists-group');
const heading = document.querySelector('.heading');
let selectedList;

generateAllLists();

//Event Listeners

allListsForm.addEventListener('submit', (e) => {
    //prevent form from refreshing page by default
    e.preventDefault();
    if (allListsInput.value) {
        createList(allListsInput.value);
        allListsInput.value = '';
    } else {
        allListsInput.placeholder = "List Must Have Name";
    }
})

allLists.addEventListener('click', (e) => {
    let listName;
    if (e.target.className === 'lists-name') {
        listName = e.target.firstChild.innerText;
        addSelected(e.target);
    } else if (e.target.nodeName === "P") {
        listName = e.target.innerText;
        addSelected(e.target.parentNode);
    } else {
        removeList(e.target.previousSibling.innerText);
        e.target.parentNode.remove();
        selectedList = undefined;
        clearList();
        heading.innerText = "Select a List";
        return;
    }
    console.log(listName);
    selectedList = getList(listName);
    clearList();
    displayList(selectedList);
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value && selectedList) {
        addTask(input.value);
        input.value = '';
    } else {
        input.placeholder = "Please Enter A Task";
        input.value = '';
    }
})

list.addEventListener('click', (e) => {
    if (e.target.className === "delete-btn") {
        removeTask(e.target.previousSibling.innerText);
        e.target.parentNode.remove();
    }
});


//Displays 
function generateAllLists() {
    let lists = getJSON();
    for (todoList of lists) {
        displayNewList(todoList);
    }
}

function displayList(todo) {
    heading.innerText = todo.name;
    for (item of todo.tasks) {
        displayNewItem(item);
    }
}

function displayNewItem(item) {
    const listItem = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add('delete-btn');
    listItem.classList.add('list-item');
    listItem.innerHTML = `<p>${item}</p>`;
    btn.innerText = 'X';
    listItem.appendChild(btn);
    list.appendChild(listItem);
}

function displayNewList(item) {
    let listItem = document.createElement('li');
    let btn = document.createElement('button');
    btn.classList.add('lists-delete-btn');
    btn.innerText = 'X';
    listItem.classList.add('lists-name');
    listItem.innerHTML = `<p>${item.name}</p>`;
    listItem.appendChild(btn);
    allLists.appendChild(listItem);
}

function getList(name) {
    let lists = getJSON();
    for (item of lists) {
        if (item.name === name) {
            return item;
        }
    }
}

function addSelected(item) {
    let listItems = allLists.querySelectorAll('.lists-name');
    for(let listItem of listItems){
        listItem.classList.remove('selected');
    }
    let currentList = item;
    item.classList.add('selected')
}

function addTask(task) {
    selectedList.tasks.push(task);
    setTasksJSON();
    displayNewItem(task);
}

function removeTask(task) {
    const index = selectedList.tasks.indexOf(task);
    selectedList.tasks.splice(index, 1);
    setTasksJSON();
}

function removeList(listName) {
    let lists = getJSON();
    for (let i = 0; i < lists.length; i++) {
        if (listName === lists[i].name) {
            lists.splice(i, 1);
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function clearAllLists() {
    while (allLists.firstChild) {
        allLists.firstChild.remove();
    }
}

function clearList() {
    while (list.firstChild) {
        list.firstChild.remove();
    }
}

function createList(name) {
    let allLists = getJSON();
    let todo = { name: name, tasks: [] };
    allLists.push(todo);
    displayNewList(todo);
    localStorage.setItem('lists', JSON.stringify(allLists));
}

function getJSON() {
    if (localStorage.getItem('lists') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('lists'));
    }
}

function setTasksJSON() {
    let lists = getJSON();
    for (taskList of lists) {
        if (taskList.name === selectedList.name) {
            taskList.tasks = selectedList.tasks;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function clearList() {
    while (list.firstChild)
        list.firstChild.remove();
}