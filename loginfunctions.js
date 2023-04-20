const form = document.querySelector('#account-form');
const loginInput = document.querySelector('#login');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', (event)=>{  
    validateForm();
    console.log(isFormValid());
    if(isFormValid()==true){
        submitData();
        fetch('database.json', {
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
     }else {
         event.preventDefault();
    }
});

function isFormValid(){
    const inputContainers = form.querySelectorAll('.input-group');
    let result = true;
    inputContainers.forEach((container)=>{
        if(container.classList.contains('error')){
            result = false;
        }
    });
    return result;
}

function validateForm() {
    //LOGIN
    if(loginInput.value.trim()==''){
        setError(loginInput, 'Login can not be empty');
    }else if(loginInput.value.trim().length <6){
        setError(loginInput, 'Login must be more than 6 characters');
    }else if(!loginInput.value.match(/^\S+$/)){
        setError(loginInput, 'Login can not contain spaces');
    }else {
        setSuccess(loginInput);
    }

    //PASSWORD
    if(passwordInput.value.trim()==''){
        setError(passwordInput, 'Password can not be empty');
    }else if(passwordInput.value.trim().length <6){
        setError(passwordInput, 'Password must be more than 6 characters');
    }else if(!passwordInput.value.match(/^(?=.*[A-Za-z])(?=.*\d).+$/)){
        setError(passwordInput, 'Password must have only letters and numbers');
    }else if(!passwordInput.value.match(/^\S+$/)){
        setError(passwordInput, 'Password can not contain spaces');
    }else {
        setSuccess(passwordInput);
    }

}

function setError(element, errorMessage) {
    const parent = element.parentElement;
    if(parent.classList.contains('success')){
        parent.classList.remove('success');
    }
    parent.classList.add('error');
    const paragraph = parent.querySelector('p');
    paragraph.textContent = errorMessage;
}

function setSuccess(element){
    const parent = element.parentElement;
    if(parent.classList.contains('error')){
        parent.classList.remove('error');
    }
    parent.classList.add('success');
}

function submitData(){
    $(document).ready(function(){
      var user = {
        login: $("#login").val(),
        password: $("#password").val(),
        action: $("#action").val(),
      };

      $.ajax({
        url: 'function.php',
        type: 'post',
        data: user,
        dataType: 'json', 
        success:function(data){
            alert(data);
            if(data.result == "Login Successful"){ 
                window.location = "success.php";
            }
            if (data.result == "Wrong Password or Login"){ 
                window.location = "login.html";
            }
        }
      });
    });
  }
