<?php 
    session_start();
    
    if(isset($_GET['logout'])){
        unset($_SESSION['user']);
        exit();
    }

    if(!isset($_SESSION['user'])){
        header("location: login.html");
        exit();
    }
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Result</title>
</head>
<body>
    <?php if(isset($_SESSION['user'])) { ?>
        <h2>Hello <?php echo $_SESSION['user']; ?></h2>
        <button><a href="?logout">Выйти</a></button>
    <?php } ?>
</body>
</html>
