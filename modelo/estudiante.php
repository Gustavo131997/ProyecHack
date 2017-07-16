<?php
/**
* La clase que representa a un estudiante
*/
class Estudiante
{
	private $nombre;
	private $apellidos;
	private $institucion;
	private $carrera;
	private $reputacion;
	function __construct($nombre, $apellidos, $institucion, $carrera, $reputacion)
	{
		$this->nombre = $nombre;
		$this->apellidos = $apellidos;
		$this->institucion = $institucion;
		$this->carrera = $carrera;
		$this->reputacion = $reputacion;
        
	}
}
?>