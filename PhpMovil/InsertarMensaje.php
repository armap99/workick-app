<?php
//datos de conexion a base de datos
//https://workick.000webhostapp.com/PhpMovil/InsertarMensaje.php?IdContratista=1&IdTrabajador=1&Contenido=Hola
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
$IdContratista = $_GET["IdContratista"];
$IdTrabajador = $_GET["IdTrabajador"];
$Contenido = $_GET["Contenido"];
$Enviado = $_GET["Enviado"];
$IdPropuesta = $_GET["IdPropuesta"];

//Conexion
$conexion = mysqli_connect($server,$usuario,$pass,$bd);
$sql = "INSERT INTO Mensaje(IdContratista, IdTrabajador, Contenido, HoraEnvio, Enviado, IdPropuesta) VALUES ('$IdContratista','$IdTrabajador','$Contenido',DATE_FORMAT(NOW( ), '%H:%i:%S'),'$Enviado','$IdPropuesta');";

if(mysqli_query($conexion,$sql)){
    echo "1";
}else{
    echo "0";
}


mysqli_close($conexion);
?>