<?php
//datos de conexion a base de datos
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";

$id = $_GET["id"];
$titulo = $_GET["titulo"];
$categoria = $_GET["categoria"];
$descripcionl = $_GET["descripcionl"];
$descripcionc = $_GET["descripcionc"];
//Conexion
$conexion = mysqli_connect($server,$usuario,$pass,$bd);
$sql = "INSERT INTO Trabajador (IdCuenta, DescripcionCorta, DescripcionLarga, Categoria,TituloTrabajo ,CalificacionPrecio,CalificacionGlobal,Trabajos) VALUE('$id','$descripcionc','$descripcionl','$categoria','$titulo',0,0,0)";
$sqlD = "UPDATE Cuenta SET Estatus = 2 WHERE Id = '$id'";

if(mysqli_query($conexion,$sql) and mysqli_query($conexion,$sqlD)){
    echo "1";
}else{
    echo "0";
}

mysqli_close($conexion);
?>