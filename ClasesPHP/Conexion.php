
<?php

class Conexion{
	public function __construct($host,$user,$pass,$baseDeDatos){
		$this->host= $host;
		$this->user= $user;
		$this->pass= $pass;
		$this->baseDeDatos=$baseDeDatos;
		$this->conectar();
	}
	public function conectar(){

		$this->mysqli = new mysqli("localhost", "root", "", "angel");

		//$this->link = mysql_connect($this->host, $this->user, $this->pass);
		//mysql_select_db($this->baseDeDatos,$this->link)OR DIE ("Error: No es posible establecer la conexión");
		

	}
	public function buscarEstudiante($num){
		$sql = "SELECT * FROM estudiante WHERE idEstudiante = ".$num;
		//$consulta = mysql_query($sql);
		$consulta = $this->mysqli->query($sql);
		//echo "entre en la funcion ";
		if ($consulta) {
			//echo "hize consulta";
		}
		
		$var= $consulta->fetch_assoc();

		//echo ($var['nombresEstudiante']);
		return $var;

		
	}



} 



 

?>