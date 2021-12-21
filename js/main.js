const list = document.querySelector('.list selected');
const form = document.querySelector('.input-group');
const input = document.querySelector('.task-input');
const allListsInput = document.querySelector('.all-lists-input');
const allLists = document.querySelector('.all-lists');

generateAllLists();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value){
        createLocalStorage(input.value);
        clearList();
        generateLists();
        input.value = '';
    } else {
        input.placeholder = "Please Enter A Task";
    }
})

list.addEventListener('click', (e) => {
    if(e.target.className === "delete-btn"){
        removeItem(e.target.previousSibling.innerText);
        e.target.parentNode.remove();
    }
})

function generateLists() {
    let todos = checkList();
    for(let i=0; i<todos.length; i++){
        const listItem = document.createElement('li');
        const btn = document.createElement('button');
        btn.classList.add('delete-btn');
        listItem.classList.add('list-item');
        listItem.id = `${i}`;
        listItem.innerHTML = `<p>${todos[i]}</p>`;
        btn.innerText = 'X';
        listItem.appendChild(btn);
        list.appendChild(listItem);
    }
}

function generateAllLists() {
    let lists = checkAllLists();
    for(let i=0; i<lists.length; i++){
        let list = document.createElement('ul');
        let listName = document.createElement('li');
        list.classList.add('list');
        listName.classList.add('lists-name');
    }
}

function clearList() {
    while(list.firstChild)
        list.firstChild.remove();
}

function createLocalStorage(item) {
    let list = checkList();
    list.push(item);
    localStorage.setItem('list', JSON.stringify(list));
}

function removeItem(item){
    let todos = checkList();
    let index = todos.indexOf(item);
    todos.splice(index, 1);
    localStorage.setItem('list', JSON.stringify(todos));
}

function checkList() {
    if(localStorage.getItem('list') === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem('list'));
    }
}

function checkAllLists() {
    if(localStorage.getItem('all-lists') === null){
        return [];
    } else {
        return JSON.parse(localStorage.getItem('all-lists'));
    }
}