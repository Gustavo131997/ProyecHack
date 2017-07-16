<?php

$connect = mysqli_connect("localhost", "root", "12abcd34ef", "Angel");

if(isset($_POST["nombres"]) && isset($_POST["apellidos"]) && isset($_POST["institucion"]) && isset($_POST["carrera"]) &&isset($_POST["user"]) && isset($_POST["pass"]) && isset($_POST["rpass"])){
  
  $nombres = mysqli_real_escape_string($connect, $_POST["nombres"]);
  $apellidos = mysqli_real_escape_string($connect, $_POST["apellidos"]);
  $institucion = mysqli_real_escape_string($connect, $_POST["institucion"]);
  $carrera = mysqli_real_escape_string($connect, $_POST["carrera"]);
  $user = mysqli_real_escape_string($connect, $_POST["user"]);
  $pass = mysqli_real_escape_string($connect, $_POST["pass"]);
  $rpass = mysqli_real_escape_string($connect, $_POST["rpass"]);

  $result = "";

  if(strlen($pass) > 30) {
    $result .= "<br>-La contraseña supera los 60 caracteres.";
  }
  if ($pass != $rpass) {
    $result .= "<br>-Las contraseñas no coinciden.";
  }

  if(strlen($user) > 30) {
    $result .= "<br>-El Estudiante supera los 50 caracteres.";
  } else {
    $sql = "SELECT COUNT(*) as cantidad FROM Estudiante WHERE usuario='$user'";
    $res = mysqli_query($connect, $sql);
    $data = mysqli_fetch_array($res);
    if ($data["cantidad"] > 0) {
      $result .= "<br>-El Estudiante ya existe.";
    }
  }

  
      $sql = "SELECT COUNT(*) as cantidad FROM Estudiante WHERE usuario='$user'";
      $res = mysqli_query($connect, $sql);
      $data = mysqli_fetch_array($res);
      

  if ($result != "") {
    echo "<div class='alert alert-dismissible alert-danger'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error</strong><br>$result</div>";
  } else {
    $sql = "INSERT INTO Estudiante VALUES(NULL , '$nombres' , '$apellidos' , '$institucion' , '$carrera'  , '$user' , '$pass')";
    mysqli_query($connect, $sql);
    echo "<div class='alert alert-dismissible alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>¡Correcto!</strong><br>Se ha registrado correctamente.</div>";
  }
} else {
  echo "Error";
}

?>
