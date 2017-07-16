<?php

$connect = mysqli_connect("localhost", "root", "12abcd34ef", "Angel");

if(isset($_POST["contenido"]) && isset($_POST["asignatura"]) && isset($_POST["cuidad"]) && isset($_POST["fechaInicial"]) &&isset($_POST["fechaFinal"]) && isset($_POST["precio"]) && isset($_POST["cupos"])){
  
  $contenido = mysqli_real_escape_string($connect, $_POST["contenido"]);
  $asignatura = mysqli_real_escape_string($connect, $_POST["asignatura"]);
  $cuidad = mysqli_real_escape_string($connect, $_POST["cuidad"]);
  $fechaInicial = mysqli_real_escape_string($connect, $_POST["fechaInicial"]);
  $fechaFinal = mysqli_real_escape_string($connect, $_POST["fechaFinal"]);
  $precio = mysqli_real_escape_string($connect, $_POST["precio"]);
  $cupos = mysqli_real_escape_string($connect, $_POST["cupos"]);

  $result = "";


  if(strlen($user) > 30) {
    $result .= "<br>-El Estudiante supera los 50 caracteres.";
  } else {
    $sql = "SELECT COUNT(*) as cantidad FROM Tutoria WHERE contenidos='$contenido'";
    $res = mysqli_query($connect, $sql);
    $data = mysqli_fetch_array($res);
    if ($data["cantidad"] > 0) {
      $result .= "<br>-El Estudiante ya existe.";
    }
  }

  
      $sql = "SELECT COUNT(*) as cantidad FROM Tutoria WHERE contenidos='$contenido'";
      $res = mysqli_query($connect, $sql);
      $data = mysqli_fetch_array($res);
      

  if ($result != "") {
    echo "<div class='alert alert-dismissible alert-danger'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>Error</strong><br>$result</div>";
  } else {
    $sql = "INSERT INTO Tutoria VALUES(NULL , 1 , '$asignatura' , '$contenido' , 12  , 34 , '$fechaInicial' , '$fechaFinal' , '$cuidad' )";
    echo $sql;
    mysqli_query($connect, $sql);
    echo "<div class='alert alert-dismissible alert-success'><button type='button' class='close' data-dismiss='alert'>&times;</button><strong>¡Correcto!</strong><br>Se ha registrado correctamente.</div>";
  }
} else {
  echo "Error";
}

?>
