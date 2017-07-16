Tutoria.php
<?php 
//include 'ClasesPHP/Conexion.php';
//include 'ClasesPHP/Estudiante.php';
/**
* 
*/
class Tutoria
{
	private $tutor;
	private $estudiantes;
	private $asignatura;
	private $contenidos;
	private $precioPersona;
	private $cupos;
	private $fechaInicio;
	private $fechaTermino;
	
	public function __construct($numTutor,$asignatura,$contenidos,$precioPersona,$cupos,$fechaInicio,$fechaTermino){
	$this->tutor = new Estudiante($numTutor);
	$this->asignatura = $asignatura;
	$this->estudiantes = new ArrayObject();
	$this->contenidos = $contenidos;
	$this->precioPersona = $precioPersona;
	$this->cupos=$cupos;
	$this->fechaInicio=$fechaInicio;
	$this->fechaTermino=$fechaTermino;


}
public function agregarEstudiantes($num){
	$estudiante = new Estudiante($num);
	$this->estudiantes->append($estudiante);
	echo $this->estudiantes[0]->getNombre();

	
}
	public function getNombre(){
		return $this->tutor;
	}
	public function getApellido(){
		return "$this->asignatura";
	}
	public function getInstitucion(){
		return "$this->estudiantes";
	}
	public function getNombre(){
		return "$this->contenidos";
	}
	public function getApellido(){
		return "$this->precioPersona";
	}
	public function getNombre(){
		return "$this->cupos";
	}
	public function getApellido(){
		return "$this->fechaInicio";
	}
	public function getInstitucion(){
		return "$this->fechaTermino";
	}
	public function getEstudiantes(){
		return $this->Estudiantes;
	}

}


 ?>