const formInput=document.getElementById("form-input");
const getInput=document.getElementById("getInput");
const FirstcardBody= document.querySelectorAll(".card-body")[0];
const secondcardBody= document.querySelectorAll(".card-body")[1];
const listItemBody= document.querySelector(".list-group");

eventListeners();
function eventListeners(){
    formInput.addEventListener("submit", addTodo); 
 
    
}



function addTodo(e){
    const newTodo=getInput.value.trim();//alınan inputun boşluklarını kapattık 
   
    addTodoUI(newTodo);
   


    e.preventDefault();
}

  function addTodoUI(todo){
     const todoElement=document.createElement("li");

     const link= document.createElement("a");

     link.href="#";
      link.innerHTML= " <i class='fas fa-trash-alt'></i>"; 
     todoElement.className = "list-group-item d-flex justify-content-between";
  
     todoElement.appendChild(document.createTextNode(todo)); //üretilen todo buraya yazılacak
     todoElement.appendChild(link);
     listItemBody.appendChild(todoElement);
      getInput.value=" ";
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






