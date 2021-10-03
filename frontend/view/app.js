
const formInput = document.getElementById("form-input");
const getInput = document.getElementById("getInput");
const FirstcardBody = document.querySelectorAll(".card-body")[0];
const secondcardBody = document.querySelectorAll(".card-body")[1];
const listItemBody = document.querySelector(".list-group");
const clearAll = document.getElementById("clear-todos"); 
eventListeners();
function eventListeners() {
  formInput.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadTodosFromIU)
  secondcardBody.addEventListener("click", deleteFromUI);
  clearAll.addEventListener("click", deleteAll);
}

// axios.get('http://localhost:2000/todo/getTodo').then(res => {
//   console.log(res.data)
// })

function addTodo(e) {
  const newTodo = getInput.value.trim();//alınan inputun boşluklarını kapattık 
  if (newTodo === "") {
    showAlert("danger", "lütfen todo yazınız");
  } else {
    addTodoUI(newTodo);
    addtoStorage(newTodo);

    axios.post('http://localhost:3000/todo/addTodo',{content:newTodo}).then(resp => {
      
      console.log(resp.data)
    }).catch(function (error) {
      console.log(error);
    })
    showAlert("success", "todo başarı ile eklendi");
  }


  if (newTodo === e.target.value) {

    showAlert("danger", "please dont repeat yourself");
    getInput.value = "";
  }




  e.preventDefault();
}
function showAlert(type, message) {
  const divItem = document.createElement("div");
  divItem.className = `alert alert-${type}`
  divItem.textContent = message;
  FirstcardBody.appendChild(divItem)
  setTimeout(function () {
    divItem.remove();
  }, 2000)

}


function getTodotothestorage() { // Storagedan Todoları Alma
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));


  }
  return todos;


}
function addTodoUI(todo) {
  const todoElement = document.createElement("li");

  const deletelink = document.createElement("a");

  deletelink.href = "#";
  deletelink.innerHTML = " <i class='fas fa-trash-alt'></i>";



  todoElement.className = "list-group-item d-flex justify-content-between";


  todoElement.appendChild(document.createTextNode(todo)); //üretilen todo buraya yazılacak
  todoElement.appendChild(deletelink);

  listItemBody.appendChild(todoElement);
  getInput.value = "";





}

    function addtoStorage (todos){
       let todo=getTodotothestorage();

       todo.push(todos);
       localStorage.setItem("todos", JSON.stringify(todo))
    
   }

   function getTodotothestorage(){
      let todos; 

      if(localStorage.getItem("todos")===null){
        todos= []
      }else{
        todos=JSON.parse(localStorage.getItem("todos"))
      }


      return todos;
   }

   function loadTodosFromIU(){
     let todo=getTodotothestorage();
     todo.forEach(function (to){
       addTodoUI(to);
     })
   }


   function deleteFromStorage(todos){
      let todo=getTodotothestorage();

      todo.forEach(function(to,index){
        if(to===todos){
          todo.splice(index,1);
        }
      })
      localStorage.setItem("todos", JSON.stringify(todo));
   }

   function deleteFromUI(e){
     
   if(e.target.className==="delete-item"){
     getInput.value.style.textDecoration="overline"
    e.target.parentElement.parentElement.remove();
    
     deleteFromStorage(e.target.parentElement.parentElement.textContent);
     console.log("başarı ile silindi")
   }
   }

function addtoStorage(todos) {
  let todo = getTodotothestorage();

  todo.push(todos);
  localStorage.setItem("todos", JSON.stringify(todo))

}


function loadTodosFromIU() {
  let todo = getTodotothestorage();
  todo.forEach(function (to) {
    addTodoUI(to);
  })
}

function deleteFromUI(e) {

  if (e.target.className === "fas fa-trash-alt") {


    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    console.log(e.target.parentElement.parentElement.textContent)
    showAlert("success", "silme başarılı");
  }


}

function deleteTodoFromStorage(deletetodo) {
  let todos = getTodotothestorage();

  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Arrayden değeri silebiliriz.
    }

  });

  localStorage.setItem("todos", JSON.stringify(todos));

}
function deleteAll(e) {
  if (confirm("hepsini siliyorsun yalnız dikkat")) {
    while (listItemBody.firstElementChild != null) {
      listItemBody.removeChild(listItemBody.firstElementChild);
    }
    localStorage.removeItem("todos");
  }
}
