const form = document.querySelector('#create-account-form');
const loginInput = document.querySelector('#login');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');
const usernameInput = document.querySelector('#username');

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
    }
    else if(!loginInput.value.match(/^\S+$/)){
        setError(loginInput, 'Login can not contain spaces');
    }else {
        setSuccess(loginInput);
    }
    //EMAIL
    if(emailInput.value.trim()==''){
        setError(emailInput, 'Enter email address');
    }else if(isEmailValid(emailInput.value)){
        setSuccess(emailInput);
    }
    else if(!emailInput.value.match(/^\S+$/)){
        setError(emailInput, 'Email can not contain spaces');
    } else{
        setError(emailInput, 'Enter valid email address');
    }

    //PASSWORD
    if(passwordInput.value.trim()==''){
        setError(passwordInput, 'Password can not be empty');
    }else if(passwordInput.value.trim().length <6){
        setError(passwordInput, 'Password must be more than 6 characters');
    }
    else if(!passwordInput.value.match(/^(?=.*[A-Za-z])(?=.*\d).+$/)){
        setError(passwordInput, 'Password must have only letters and numbers');
    }
    else if(!passwordInput.value.match(/^\S+$/)){
        setError(passwordInput, 'Password can not contain spaces');
    }else {
        setSuccess(passwordInput);
    }
    //CONFIRM PASSWORD
    if(confirmPasswordInput.value.trim()==''){
        setError(confirmPasswordInput, 'Password can not be empty');
    }else if(confirmPasswordInput.value !== passwordInput.value){
        setError(confirmPasswordInput, 'Password does not match');
    }else {
        setSuccess(confirmPasswordInput);
    }
    //USERNAME
    if(usernameInput.value.trim()==''){
        setError(usernameInput, 'Name can not be empty');
    }else if(usernameInput.value.trim().length <2){
        setError(usernameInput, 'Name must be more than 2 charecters');
    }else if(!usernameInput.value.match(/^[a-zA-Zа-яА-Я]+$/)){
            setError(usernameInput, 'Username must have only letters');
    }
    else if(!usernameInput.value.match(/^\S+$/)){
        setError(usernameInput, 'Username can not contain spaces');
    } else {
        setSuccess(usernameInput);
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

function isEmailValid(email){
    const reg =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return reg.test(email);
}

function submitData() {
    $(document).ready(function(){
      var user = {
        login: $("#login").val(),
        password: $("#password").val(),
        email: $("#email").val(),
        username: $("#username").val(),
        action: $("#action").val(),
      };

      $.ajax({
        url: 'function.php',
        type: 'post',
        data: user,
        dataType: 'json',
        success:function(data){
            alert(data);
            if(data.result == "Registration Successful"){
                window.location = "success.php";
            }
            if (data.result == "Login or email have been already taken"){
                window.location = "index.html";
            }
        }
      });
    });
  }