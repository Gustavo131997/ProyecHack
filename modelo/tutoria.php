<?php
include 'estudiante.php';
include 'componentes/ArrayList.php';
/**
* 
*/
class Tutoria 
{
	/**
	 * El nombre de la tutoria
	 * @var string
	 */
	private $name;
	/**
	 * Indica la materia la cual se trata la tutoria
	 * @var string
	 */
	private $materia;
	/**
	 * Indica el lugar donde se va a desarrollar la tutoria
	 * @var string
	 */
	private $direccion;
	/**
	 * 
	 * @var string
	 */
	private $fecha;
	/**
	 * Indica el inicio de la tutoria 
	 * @var string
	 */
	private $horaInicio;
	/**
	 * Indica la hora de termino de la tutoria
	 * @var string
	 */
	private $horaFinal;
	/**
	 * Indica el estado de la tutoria, el cual seria habilitado cuando aun no se ha realizado la tutoria y desbilitado cuando se haya realizado la tutoria, se pueda cambia el estado si se quiere realizar la misma tutoria pero en otra fecha
	 * @var string
	 */
	private $estado;
	/**
	 *
	 */
	private $tutor;

	private $estudiantes;
	function __construct($name, $materia, $direccion, $fecha, $horaInicio, $horaFinal )
	{
		$this->name = $name;
		$this->materia = $materia;
		$this->direccion = $direccion;
		$this->fecha = $fecha;
		$this->horaInicio = $horaInicio;
		$this->horaFinal = $horaFinal;

	}

	function getFecha(){
		return $this->fecha;
	}
	function setFecha($fecha){
		$this->fecha = $fecha;
	}
	function getName(){
		return $this->name;
	}
	function setName($name){
		$this->name = $name;
	}
	function getHoraInicio(){
		return $this->horaInicio;
	}
	function setHoraInicio($horaInicio){
		$this->horaInicio = $horaInicio;
	}

	function getHoraFinal(){
		return $this->horaFinal;
	}
	function setHoraFinal($horaFinal){
		$this->horaFinal = $horaFinal;
	}
	function getDireccion(){
		return $this->direccion;
	}
	function setDireccion($direccion){
		$this->direccion = $direccion;
	}

	function setEstado($estado){
		$this->estado = $estado;
	}

	function getEstado(){
		return $this->estado;
	}

	function getTutor(){
		return $this->tutor;
	}
	function setTutor($tutor){
		$this->tutor = $tutor;
	}

	function añadirEstudiante($estudiante){

	}
}
?>