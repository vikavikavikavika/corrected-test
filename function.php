<?php
    session_start();
    // IF FOR CHOOSING FORM-ACTION
    if(isset($_POST["action"])){
      if($_POST["action"] == "register"){
        register();
      }
      else if($_POST["action"] == "login"){
        login();
      }
    }

    function register() {
      $usersJson = file_get_contents('database.json');
      $users = json_decode($usersJson, true);
          
      $login = htmlspecialchars($_POST["login"]);
      $password = htmlspecialchars($_POST["password"]);
      $email = htmlspecialchars($_POST["email"]);
      $username = htmlspecialchars($_POST["username"]);
  
      // if user has already exist in database
      foreach ($users as $user) {
          if ($user['login'] === $login) {
            $result = array("result" => "Login has already been taken");
            echo json_encode($result);
            exit(0);
          }
          if ($user['email'] === $email) {
            $result = array("result" => "Email has already been taken");
            echo json_encode($result);
            exit(0);
          }
      }
  
      // if user with such email and login does not exist, put in database
      $password = md5($password);
      $newUser = [
          "login" => $login,
          "password" => $password,
          "email" => $email,
          "username" => $username,
      ];
      $users[] = $newUser;
      file_put_contents('database.json', json_encode($users));
      echo json_encode(array("result" => "Registration Successful"));
      session_start();
      $_SESSION['user'] = $login;
      exit(0);
  }
  
    // LOGIN
    function login(){
      $usersJson = file_get_contents('database.json');
      $users = json_decode($usersJson, true);
  
      $login = htmlspecialchars($_POST["login"]);
      $password = md5(htmlspecialchars($_POST["password"]));
  
      foreach ($users as $user) {
          if ($login === $user['login'] && $password === $user['password']) {
            $result = array("result" => "Login Successful");
            echo json_encode($result);
            $_SESSION['user'] = $login;
            exit(0);
        }
      }
      $result = array("result" => "Wrong Password or Login");
      echo json_encode($result);
      exit(0);
  }
?>
