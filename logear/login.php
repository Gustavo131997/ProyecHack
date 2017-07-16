<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Iniciar Sesion</title>
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
          <h1><p class="text-center">Iniciar Sesion</p></h1>
          <br><br>

          <form method="post" >

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
            <br><br>

            <div class="form-group">
              <input type="button" name="iniciar" id="iniciar" class="btn btn-success" value="Iniciar Sesion">
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
    $('#iniciar').click(function(){

      var user = $('#user').val();
      var pass = $('#pass').val();

      if ($.trim(user).length > 0 && $.trim(pass).length > 0 ){
        $.ajax({
          url:'logeo.php',
          method:"POST",
          data:{ user:user, pass:pass },
          cache:false,
          beforeSend:function(){
            $('#iniciar').val("Comprobando información...");
          },
          success:function(data){
            $('#iniciar').val("Iniciar");
            if(data){
              $("#result").html(data);
            };
          }
        });
      };
    });
  });
</script>
