<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Crear Tutoria</title>

    <!-- Bootstrap core CSS -->
    <link href="dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="jumbotron-narrow.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
    <script src="assets/js/ie-emulation-modes-warning.js"></script>

    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="assets/js/ie10-viewport-bug-workaround.js"></script>
    <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>
    <?php
      include('/home/gustavo/Documentos/proyectHack/vista/navbar.html');
    ?>
  <body>

    

      <div class="jumbotron">
        <h1>Crea una ayudantía</h1><br/>
        <p class="lead"></p>
        <p><input name = "asignatura" id="asignatura" type="text" class="form-control" placeholder="Asignatura"></input></p>
        <p><input name="contenido" id="contenido" type="text" class="form-control" placeholder="Contenido"></input></p>
        <input name="cuidad" id="cuidad"  type="text" class="form-control" placeholder="Ciudad"></input>
        <br>
        <input name="cupos" id="cupos" type="text" class="form-control" placeholder="Cupos"></input>
        <br>
        <input name="precio" id="precio" type="text" class="form-control" placeholder="Precio ayudantia"></input>
        <br>Desde: <input name="fechaInicial" id="fechaInicial" type="datetime-local" value="16-07-2017"> Hasta: <input name="fechaFinal" id="fechaFinal" type="datetime-local" min="2017-07-16">
        <p><br><input type="button" name="iniciar" id="iniciar" class="btn btn-success" value="Crear!"></p>
      </div>



      <div class="footer">
        <p>2017 Hecho en Chile</p>
      </div>

    </div>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
   


    <script type="text/javascript">
      $('#iniciar').click(function(){

        var contenido = $('#contenido').val();
        var asignatura = $('#asignatura').val();
        var cuidad = $('#cuidad').val();
        var cupos = $('#cupos').val();
        var precio= $('#precio').val();
        var fechaInicial = $('#fechaInicial').val();
        var fechaFinal = $('#fechaFinal').val();

        $(this).val("Comprobando información...");

        if ($.trim(contenido).length > 0 && $.trim(asignatura).length > 0 && $.trim(cuidad).length > 0
            && $.trim(fechaInicial).length > 0 && $.trim(fechaFinal).length > 0 && $.trim(precio).length > 0 && $.trim(cupos).length > 0){

            $.ajax({
              url:'controller.php',
              method: 'POST',
              data: { 
                "contenido":contenido, 
                "asignatura":asignatura,
                "cuidad":cuidad, 
                "fechaInicial":fechaInicial, 
                "fechaFinal":fechaFinal, 
                "precio":precio, 
                "cupos":cupos
              },
              success:function(){
                $('#iniciar').val('Crear!');
               window.location = 'http://localhost/paginaBuscarAsignatura/index.php'
              }
            });
          }
        });
    </script>
  </body>
</html>

