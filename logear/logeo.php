<?php

$connect = mysqli_connect("localhost", "root", "12abcd34ef", "Angel");

if(isset($_POST["user"]) && isset($_POST["pass"]) ){
  
  $user = mysqli_real_escape_string($connect, $_POST["user"]);
  $pass = mysqli_real_escape_string($connect, $_POST["pass"]);

  $result = "";

  if(strlen($pass) > 60) {
    $result .= "<br>-La contraseña supera los 60 caracteres.";
  }

  if(strlen($user) > 50) {
    $result .= "<br>-El Estudiante supera los 50 caracteres.";
  } else {
    $sql = "SELECT COUNT(*) as cantidad FROM Estudiante WHERE usuario='$user'";
    $res = mysqli_query($connect, $sql);
    $data = mysqli_fetch_array($res);
    if ($data["cantidad"] == 0) {
      $result .= "<br>-El usuario no existe.";
    }
  }

  
      $sql = "SELECT COUNT(*) as cantidad FROM Estudiante WHERE usuario='$user'";
      $res = mysqli_query($connect, $sql);
      $data = mysqli_fetch_array($res);
      

  if ($result != "") {
    echo "<div class='alert alert-dismissible alert-danger'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error</strong><br>$result</div>";
  } else {
    $sql = "SELECT * FROM Estudiante WHERE usuario='$user' ";
    mysqli_query($connect, $sql);
    echo "<div class='alert alert-dismissible alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>¡Correcto!</strong><br>Se ha logeado.</div>";
  }
} else {
  echo "Error";
}

?>
