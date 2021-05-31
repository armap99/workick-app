<?php
//credenciales
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";

//conexion al servidor
$cone = mysqli_connect($server,$usuario,$pass,$bd);

//datos a recibir
$id = $_GET["id"];
$idTrabajador = $_GET["idTrabajador"];

$sql ="UPDATE `Propuesta` SET `Estatus`=3, `FechaFin`=CURDATE() WHERE Id='$id'";
mysqli_query($cone,$sql);
$actualizado =mysqli_affected_rows($cone);

$sqlD ="UPDATE Trabajador SET Trabajos= Trabajos+1 WHERE Id='$idTrabajador'";
mysqli_query($cone,$sqlD);
$actualizadoD =mysqli_affected_rows($cone);
if($actualizado>0 and $actualizadoD>0){
    echo "1";
}else{
    echo "0";
}

mysqli_close($cone);
?>