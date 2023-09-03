const form = document.querySelector("form")
let title = document.querySelector("#title")
let desp = document.querySelector("#description")
var add_btn = document.querySelector("#add_btn")
let task_cont = document.querySelector("#task_container")

var todo = localStorage.getItem("Tasks") ? JSON.parse(localStorage.getItem("Tasks")) : [];

let uniqueid = localStorage.getItem("Uniqueid") ? JSON.parse(localStorage.getItem("Uniqueid")) : 0

showAllTasks()
function showAllTasks() {
    let li = ""
    todo.forEach((el, index) => {
        li += `
        <div class="list" id="${el.id}">
            <h2>${el.Title}</h2>
            <P>${el.Description}</P>
            <button class="edit" onclick="edit(${el.id})">Edit</button>
            <button class="delete" onclick="del(${el.id})">Delete</button>
        </div>`
    });
    task_cont.innerHTML = li
}

function del(id) {
    todo.forEach((value, index) => {
        if (value.id == id) {
            todo.splice(index, 1)
            // document.getElementById(id).remove()
            localStorage.removeItem("Tasks", JSON.stringify(todo))
            localStorage.setItem("Tasks", JSON.stringify(todo))
            showAllTasks()
        }
    })
}


var saveId = 0

function edit(id) {
    saveId = id
    todo.find((value, index) => {
        if (value.id == id) {
            // console.log(value.Title, id)
            title.value = value.Title
            desp.value = value.Description
            add_btn.innerHTML = "SAVE"
        }
    })
}




function add() {
    if (add_btn.innerHTML == "SAVE") {
        todo.find((value) => {
            if (value.id == saveId) {
                value.Title = title.value
                value.Description = desp.value
                localStorage.removeItem("Tasks", JSON.stringify(todo))
                localStorage.setItem("Tasks", JSON.stringify(todo))
                showAllTasks()
                add_btn.innerHTML = "Add"
                title.value = ""
                desp.value = ""
            }
        })
    }
    else if (add_btn.innerHTML == "Add") {
        var list = {
            Title: title.value,
            Description: desp.value,
            id: uniqueid,
        }

        todo.push(list);

        uniqueid++

        localStorage.setItem("Uniqueid", JSON.stringify(uniqueid))
        localStorage.setItem("Tasks", JSON.stringify(todo))
        showAllTasks()
        title.value = ""
        desp.value = ""
    }
}


