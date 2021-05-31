<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$descripcion=$_GET['descripcion'];
$municipio=$_GET['municipio'];
$direccion=$_GET['direccion'];
$idContratista=$_GET['idContratista'];
$idTrabajador=$_GET['idTrabajador'];

$sql = "SELECT Categoria from Trabajador WHERE Id = '$idTrabajador'";
$resultadoDos=mysqli_query($cone,$sql);
$categoria = array();
$categoria = mysqli_fetch_assoc($resultadoDos);
$categoria = $categoria['Categoria'];

$sqlD = "INSERT INTO Propuesta (IdUsuario, IdTrabajador, UbicacionPropuesta,Municipio,Descripcion,FechaAlta,Estatus,Categoria) VALUES ('$idContratista', '$idTrabajador','$direccion','$municipio','$descripcion',CURDATE(),1,$categoria)";

if(mysqli_query($cone,$sqlD)){
        echo "1";
}else{
        echo "0";
    }


mysqli_close($cone);
?>