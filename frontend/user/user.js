

const button= document.getElementById("button");
const email=document.getElementById("email");
const password=document.getElementById("password"); 

const form = document.querySelector(".form");

eventListeners(); 

function eventListeners(){
   button.addEventListener("click", submitRegister);



}

 function submitRegister(e){
    const newEmail=email.value.trim();
    const newPassword=password.value.trim();
     if(newEmail==="" & newPassword===""){
       showAlert("danger","email or password coulnt be empty"); 
     } else{
        axios.post('http://localhost:3000/registerPage/register',{email:newEmail, password: newPassword}).then(resp => {
      
            console.log(resp.data);
            window.location.replace('http://localhost:5500/frontend/view/')
          }).catch(function (error) {
            console.log(error);
          })
     
   //şifreyi uygun olmamasına rağmen giriş başarılı dedi?!! 
        //showAlert("success","giriş başarılı "); 
          
     }
    
   e.preventDefault();
 }


  function showAlert(type, message){
   
      const divItem = document.createElement("div");
      divItem.className = `alert alert-${type}`
      divItem.textContent = message;
      form.appendChild(divItem)
      setTimeout(function () {
        divItem.remove();
      }, 2000)
  }