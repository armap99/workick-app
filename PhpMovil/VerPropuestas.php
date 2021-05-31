<?php
$server = "localhost";
$usuario = "id16193735_adminworkickdb";
$pass = "fgv9T=a@fW%O*8a0";
$bd = "id16193735_workickdb";
//conectar a server
$cone = mysqli_connect($server,$usuario,$pass,$bd);
$opcion=$_GET['opcion'];
$Id=$_GET['Id'];

if($opcion == 0){
    $sql = "SELECT Propuesta.Id, Propuesta.IdUsuario, Propuesta.IdTrabajador, Propuesta.UbicacionPropuesta, Propuesta.Municipio, Propuesta.Descripcion, Propuesta.FechaAlta, Propuesta.Estatus, Propuesta.Categoria, Cuenta.Nombre AS NombreCliente FROM Propuesta INNER JOIN Cuenta ON Cuenta.Id = Propuesta.IdUsuario WHERE IdTrabajador = (SELECT Trabajador.Id FROM Trabajador WHERE Trabajador.IdCuenta = '$Id')";
}
else{
    $sql = "SELECT Propuesta.Id, Propuesta.IdUsuario, Propuesta.IdTrabajador, Propuesta.UbicacionPropuesta, Propuesta.Municipio, Propuesta.Descripcion, Propuesta.FechaAlta, Propuesta.Estatus, Propuesta.Categoria, Cuenta.Nombre AS NombreCliente FROM Propuesta INNER JOIN Cuenta ON Cuenta.Id = Propuesta.IdUsuario WHERE IdTrabajador = (SELECT Trabajador.Id FROM Trabajador WHERE Trabajador.IdCuenta = '$Id') and Propuesta.Estatus = '$opcion'";
}

$resultado=mysqli_query($cone,$sql);
$datos=array();
if(mysqli_num_rows($resultado)>0){
    while($row = mysqli_fetch_assoc($resultado)){
        //echo "Cita: ".$row['Mes']. " ". $row['Dia']." ".$row['Hora']."<br>";
        $datos[] = $row;
    }
}
echo json_encode($datos);
mysqli_close($cone);
?>