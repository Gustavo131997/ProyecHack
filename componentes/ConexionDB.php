<?php

/**
 * Created by PhpStorm.
 * User: root
 * Date: 15-07-17
 * Time: 19:57
 */
class ConexionDB
{
    private $database= "chiel";
    private $servidor = "localhost";

    public function getConexion(){
        return new mysqli($this->servidor, "root", "12abcd34ef",$this->database);
    }
}