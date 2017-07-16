Estudiante.php
<?php 
class Estudiante{
private $nombre;
private $apellido;
private $institucion;


		function __construct()
	{
		$args = func_get_args();
		$nargs = func_num_args();
		switch($nargs){
			case 1:
				self::__construct1($args[0]);
				break;
			case 3:
				self::__construct2($args[0], $args[1],$args[2]);
				break;
	}
	}
	function __construct1($numero)
	{
		$array = $this->buscadorTutor($numero);
		$this->nombre = $array['nombresEstudiante'];
 		$this->apellido = $array['apellidosEstudiante'];
 		$this->institucion = $array['institucion'];
	}
	function __construct2($valor1, $valor2,$valor3)
	{
		$this->nombre = $valor1;
		$this->apellido = $valor2;
		$this->institucion = $valor3;
	}

	//public function __construct($nombre,$apellido,$institucion){
	//	$this->nombre = $nombre;
	//	$this->apellido = $apellido;
	//	$this->institucion = $institucion;

	//}
	//public function __construct($numero){
	//	$array = $this->buscadorTutor($numero);
	//	$this->nombre = $array['nombresEstudiante'];
 	//	$this->apellido = $array['apellidosEstudiante'];
 	//	$this->institucion = $array['institucion'];
	//}
	public function buscadorTutor($numero){
		echo "entro \n";
		$con = new Conexion("localhost", "root", "", "angel");
 		return $con->buscarEstudiante($numero);

	}
	public function getNombre(){
		return "$this->nombre";
	}
	public function getApellido(){
		return "$this->apellido";
	}
	public function getInstitucion(){
		return "$this->institucion";
	}



}

 ?>