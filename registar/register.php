<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Registro</title>
    <meta charset="utf-8">
  <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  </head>
  <body>
  <?php
  include 'navbar.html';
  ?>

    <div class="container">
      <div class="row">
        <div class="col-md-6 col-md-offset-3">

          <br><br>
          <h1><p class="text-center">Registro</p></h1>
          <br><br>

          <form method="post" >

            <div class="form-group">
                  <label for="user">Nombre(s):</label>
                  <input type="text" name="nombres" id="nombres" class="form-control"
                  placeholder="Ingrese Nombre(s)" type="text">
                </div>
                  <div class="form-group">
                    <label for="apPaterno">Apellidos</label>
                    <input type="text" name="apellidos" id="apellidos" class="form-control"
                    placeholder="Ingrese sus apellidos" type="text">
                  </div>
            <div class="form-group">
              <label for="user">Institucion</label>
              <input type="text" name="institucion" id="institucion" class="form-control"
              placeholder="Ingrese su Institucion" type="text">
            </div>

            <div class="form-group">
              <label for="user">Carrera</label>
              <input type="text" name="carrera" id="carrera" class="form-control"
              placeholder="Ingrese su nombre de su carrera" type="text">
            </div>
            <div class="form-group">
              <label for="user">Usuario</label>
              <input type="text" name="user" id="user" class="form-control"
              placeholder="Ingrese su nombre de usuario" type="text">
            </div>

            <div class="form-group">
              <label for="pass">Contraseña</label>
              <input type="password" name="pass" id="pass" class="form-control"
              placeholder="Ingrese su contraseña" type="text">
            </div>

            <div class="form-group">
              <label for="rpass">Repetir contraseña</label>
              <input type="password" name="rpass" id="rpass" class="form-control"
              placeholder="Ingrese nuevamente su contraseña" type="text">
            </div>

            <br><br>

            <div class="form-group">
              <input type="button" name="registrar" id="registrar" class="btn btn-success" value="Registrar">
            </div>

            <br><br>

            <span id="result"></span>

          </form>

        </div>
      </div>
    </div>

  </body>
</html>

<script type="text/javascript">
  $(document).ready(function(){
    $('#registrar').click(function(){

      var nombres = $('#nombres').val();
      var apellidos = $('#apellidos').val();
      var institucion = $('#institucion').val();
      var carrera = $('#carrera').val();
      var user = $('#user').val();
      var pass = $('#pass').val();
      var rpass = $('#rpass').val();
      if ($.trim(nombres).length > 0 && $.trim(apellidos).length > 0 && $.trim(institucion).length > 0 && $.trim(carrera).length > 0 && $.trim(user).length > 0 && $.trim(pass).length > 0  && $.trim(rpass).length > 0){
        $.ajax({
          url:'registrame.php',
          method:"POST",
          data:{nombres:nombres, apellidos:apellidos, institucion:institucion, carrera:carrera, user:user, pass:pass, rpass:rpass},
          cache:false,
          beforeSend:function(){
            $('#registrar').val("Comprobando información...");
          },
          success:function(data){
            $('#registrar').val("Registrar");
            if(data){
              $("#result").html(data);
            };
          }
        });
      };
    });
  });
</script>
