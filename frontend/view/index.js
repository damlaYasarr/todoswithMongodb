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
  }


   function addtoStorage (todo){

    
   }





