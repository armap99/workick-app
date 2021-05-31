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

$sql ="DELETE FROM `Propuesta`  WHERE Id='$id'";
mysqli_query($cone,$sql);
$actualizado =mysqli_affected_rows($cone);
if($actualizado>0){
    echo "1";
}else{
    echo "0";
}

mysqli_close($cone);
?>