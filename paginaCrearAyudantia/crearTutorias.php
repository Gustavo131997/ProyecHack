<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Crear ayudantía</title>

    <!-- Bootstrap core CSS -->
    <link href="dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <script src="/home/gustavo/Documentos/proyectHack/logear/js/jquery-3.2.1.min.js"></script>
    <script src="/home/gustavo/Documentos/proyectHack/logear/js/bootstrap.min.js"></script>
    <!-- Custom styles for this template -->
    <link href="jumbotron-narrow.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/ie-emulation-modes-warning.js"></script>

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

	  <form action="crearTutorias.php" method="post">
		<div class="jumbotron">
        <h1>Crea una ayudantía</h1><br/>
        <p class="lead"></p>
        <p><input type="text" name="Asignatura" class="form-control" placeholder="Asignatura" method="post" action="crearTutorias.php"></input></p>
        <p><input type="text" name="Materia" class="form-control" placeholder="Materia" method="post" action="crearTutorias.php"></input></p>
        <input type="text" name="Ciudad" class="form-control" placeholder="Ciudad" method="post" action="crearTutorias.php"></input>
        <br>Desde: <input  name = "Inicio"type="datetime-local" value= "16-07-2017" > Hasta: <input name="Fin" type="datetime-local" min="2017-07-16" >

        <p><br><input id="registro" class="btn btn-lg btn-success" href="crearTutorias.php" role="button" type="submit"></input></p>
		</div>
	  </form>
	<HTML>
<HEAD>
<TITLE>crearTutorias.php</TITLE>
</HEAD>
<BODY>
<?php
	if (isset($_POST['Asignatura']) && isset($_POST['Materia']) && isset($_POST['Ciudad']) 
	&& isset($_POST['Inicio']) && isset($_POST['Fin'])	){
	   
	  $asignatura = $_POST['Asignatura'];
	  $materia = $_POST['Materia'];
	  $Ciudad = $_POST['Ciudad'];
	  $Inicio = $_POST['Inicio'];
	  $Fin = $_POST['Fin'];
	  $tutoria= new Tutoria(1,$asignatura,$materia,5000,5,$Inicio,$Fin);
	  echo "El volumen del cilindro es de ".$Ciudad." metros cúbicos";
	}
?>
</BODY>
</HTML>


      <div class="footer">
        <p>2017 Hecho en Chile</p>
      </div>

    </div>
  </body>
</html>
