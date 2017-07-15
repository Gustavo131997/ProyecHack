<?php
/**
* 
*/
class Tutoria 
{
	/**
	 * 
	 * @var string
	 */
	private $name;
	/**
	 * 
	 * @var string
	 */
	private $materia;
	/**
	 * 
	 * @var string
	 */
	private $direccion;
	/**
	 * 
	 * @var string
	 */
	private $fecha;
	/**
	 * 
	 * @var string
	 */
	private $horaInicio;
	/**
	 * 
	 * @var string
	 */
	private $horaFinal;

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
		$this->fecha
	}
}
?>